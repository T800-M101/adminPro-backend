// ================= IMPORTS ===============================//
// Se importa el modelo para poder crear objetos con mongoose y trabajar con la DB
const { response } = require('express'); // sirve para definir el tipo de la respuesta y tener las ayudas en VSCODE
const Hospital = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt');

const getHospitals = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('user','name img')

     res.json({
         ok:true,
         hospitales
     })

}


const createHospital = async (req, res = response) => {
// Get id of the authenticated user
   const id = req.uid;

// Create an instance of the model where we have the ORM
   const hospital = new Hospital({
       user:id,
       ...req.body}
       );

 
   
   try {

  // Saving the hospital in the DB  
       const hospitalSaved = await hospital.save();

       res.json({
        ok:true,
        hospital:hospitalSaved
    })

   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg:"Talk to the admin"
       });
   }  
}


const updateHospital = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;


   try {

      const hospital = await Hospital.findById(id);

      if(!hospital){
         return res.status(404).json({
             ok:false,
             msg: 'There is no hospital with this id.'
         });
      }

      const hospitalChanges = {
          ...req.body,
          user:uid
      }

      // {new:true} regresa el último documento actualizado
      const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalChanges, {new: true});


       res.json({
           ok:true,
           hospitalUpdated
       });
       
   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok:false,
           msg: 'Talk to the admin.'
       });
   }

}



const deleteHospital = async(req, res = response) => {
    const id = req.params.id;
   


   try {

      const hospital = await Hospital.findById(id);

      if(!hospital){
         return res.status(404).json({
             ok:false,
             msg: 'There is no hospital with this id.'
         });
      }

     

      // {new:true} regresa el último documento actualizado
      await Hospital.findByIdAndDelete(id);


       res.json({
           ok:true,
           msg:'Hospital deleted.'
       });
       
   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok:false,
           msg: 'Talk to the admin.'
       })
   }

   
}




module.exports = {
   getHospitals,
   createHospital,
   updateHospital,
   deleteHospital
}