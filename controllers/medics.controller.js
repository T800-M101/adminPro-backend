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


const updateMedic = (req, res = response) => {
    res.json({
        ok:true,
        msg:'Houston!!'
    })
}



const deleteMedic = (req, res = response) => {
    res.json({
        ok:true,
        msg:'Houston!!'
    })
}




module.exports = {
   getMedics,
   createMedic,
   updateMedic,
   deleteMedic
}