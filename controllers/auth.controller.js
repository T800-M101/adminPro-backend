// ================= IMPORTS ===============================//
// Se importa el modelo para poder crear objetos con mongoose y trabajar con la DB
const { response } = require('express'); // sirve para definir el tipo de la respuesta y tener las ayudas en VSCODE
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {


    const {email, password} = req.body;

    try {
     // Check if the email exists
       const userDB = await User.findOne({email});
    
       if(!userDB){
           // error 404 not found
           return res.status(404).json({
               ok:false,
               msg: "invalid credentials."
           });
       }
      // Verify password
      const validPassword = bcrypt.compareSync(password, userDB.password);

      if(!validPassword){
          // error 400 Bad Request
          return res.status(400).json({
              of:false,
              msg:"Invalid credentials"
          })
      }
         // Generte TOKEN - JWT

         const token = await generateJWT(userDB._id);
            res.json({
                ok:true,
                token
            })


    } catch (error) {
        console.log(error);
        //error 500 Internal server error
        res.status(500).json({
            ok:false,
            msg: 'Something is fishy! Talk to the administrator.'
        })
    }

}


module.exports = {
    login
}