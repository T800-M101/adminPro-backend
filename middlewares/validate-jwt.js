const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

   // Read token
   const token = req.header('x-token');
 
   if(!token){
       // error 401 Unauthorized
       return res.status(401).json({
           ok:false,
           msg:'Not authorized'
       })
   }

   try {
    
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    // Add uid to request to know thw user that makes the request
    req.uid = uid;
    next();


   } catch (error) {
       console.log(error);

       return res.status(401).json({
           ok:false,
           msg:"Token Invalid"
       })
   }

}













module.exports = {
    validateJWT
}