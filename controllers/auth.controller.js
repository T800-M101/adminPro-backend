// ================= IMPORTS ===============================//
// Se importa el modelo para poder crear objetos con mongoose y trabajar con la DB
const { response } = require('express'); // sirve para definir el tipo de la respuesta y tener las ayudas en VSCODE
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

// Google controller
const googleSignIn = async( req, res = response) => {

const googleToken = req.body.token;

try {
    
  const {name, email, picture } =  await googleVerify(googleToken);

  // Verify user in the database with the email
  const userDB = await User.findOne({ email});
  let user;

  if(!userDB){
      // if user does not exist
    user = new User({
       name,
       email,
       password: '@@@',
       img:picture,
       google:true
    });

  }else {
      // If user exist
    user = userDB;
    user.google = true
    user.password = '@@@'
  }

// Save into database
await user.save();

   // Generte TOKEN - JWT

   const token = await generateJWT(user._id);
   res.json({
       ok:true,
       token
   })

    res.json({
        ok:true,
        msg:'Google Signin',
        token
    });

} catch (error) {
    console.log(error)
    res.status(401).json({
        ok:false,
        msg:'Token is invalid'
        
    });
}


}

module.exports = {
    login,
    googleSignIn
}