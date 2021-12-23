// ================= IMPORTS ===============================//
// Se importa el modelo para poder crear objetos con mongoose y trabajar con la DB
const { response } = require('express'); // sirve para definir el tipo de la respuesta y tener las ayudas en VSCODE
const Medic = require('../models/medic.model');
const { generateJWT } = require('../helpers/jwt');

const getMedics = async (req, res = response) => {

    const medics = await Medic.find()
                              .populate('user','name img')
                              .populate('hospital', 'name img')

     res.json({
         ok:true,
         medics
     })

}


const createMedic = async (req, res = response) => {

    // Get user ID
    const uid = req.uid;
   // Create new instance of the medic model and place the user ID taken from the request
    const medic = new Medic({
        user: uid,
        ...req.body
    });
console.log(medic);
    try {
      // Save the medic in the DB
        const medicSaved = await medic.save();

        res.status(200).json({
            ok:true,
            medic:medicSaved
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Talk to the admin"
        })
        
    }
    
}


const updateMedic = async(req, res = response) => {
    const name = req.params.name;
    const id = req.params.id;
    const uid = req.uid;

   try {

    
    const medic = await Medic.findById(id);

    if(!medic){
       return res.status(404).json({
           ok:false,
           msg: 'There is no medic with this id.'
       });
    }

    const medicChanges = {
        ...req.body,
        user:uid
    }

    // {new:true} regresa el último documento actualizado
    const medicUpdated = await Medic.findByIdAndUpdate(id, medicChanges, {new: true});
       res.json({
           ok:true,
           msg:'The medic has been updated',
           medicUpdated
       });
       
   } catch (error) {
       console.log(error);
       res.status(500).json({
        ok:false,
        msg: 'Talk to the admin.'
    });
   }
}



const deleteMedic = async(req, res = response) => {
    const id = req.params.id;
   try {

    
    const medic = await Medic.findById(id);

    if(!medic){
       return res.status(404).json({
           ok:false,
           msg: 'There is no medic with this id.'
       });
    }

   

    // {new:true} regresa el último documento actualizado
    await Medic.findOneAndDelete(id);
       res.json({
           ok:true,
           msg:'The medic has been deleted',
           
       });
       
   } catch (error) {
       console.log(error);
       res.status(500).json({
        ok:false,
        msg: 'Talk to the admin.'
    });
   }
}




module.exports = {
   getMedics,
   createMedic,
   updateMedic,
   deleteMedic
}