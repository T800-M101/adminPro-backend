// ================= IMPORTS ===============================//
// Se importa el modelo para poder crear objetos con mongoose y trabajar con la DB
const { response } = require('express'); // sirve para definir el tipo de la respuesta y tener las ayudas en VSCODE
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {

    const users = await User.find({},'name email role google');
   
    res.json({
        ok:true,
        users,
        uid:req.uid
    })
}



const createUser = async (req, res = response) => {
   // El la req está lo que la persona esta solicitando
   const { email, password } = req.body;


   try {

        const existeEmail = await User.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: "The email is already taken!"
            });
        }

        // Se crea un objeto con las propiedades que vienen del body
            const user = new User(req.body);

        // Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);    

        // Guardando en la base de datos
            await user.save();
        // Generado token
            const token = await generateJWT(user._id);

        res.json({
            ok:true,
            user,
            token
        })
       
   } catch (error) {
       console.log();
       res.status(500).json({
           ok: false,
           msg: 'Unexpected error... check logs.'
       })
   }
 
}

const updateUser = async (req, res = response) => {
    
    const uid = req.params.id;
    try {

        const dbUser = await User.findById(uid);

        if(!dbUser){
            // error 404 Not Found
            return res.status(404).json({
                ok: false,
                msg: "No user identified by id provided."
            });
        }

        // TODO: Validar token y comprobar si es el ususario correcto
        // Actualizaciones
        const {password, google, email, ...fields} = req.body;

        if(dbUser.email !== email){
        
           const existeEmail = await User.findOne({ email });
           if(existeEmail){
               // error 400 Bad Request
               return res.status(400).json({
                   ok: false,
                   msg: "There is an user with this email!"
               })
           }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok:true,
            user: updatedUser
        })
        
    } catch (error) {
        console.log(error);
        // error 500 Interal server error
        res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        })
    }
}


const deleteUser = async(req, res = response) => {
 
     const uid = req.params.id;
   

    try {
        const dbUser = await User.findById(uid);
        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: "No user identified by id provided."
            });
        }

         await User.findOneAndDelete( uid );
       
        res.json({
            ok:true,
            msg: 'User deleted!'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        })
    }

}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}