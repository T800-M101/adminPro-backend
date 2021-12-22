// getTodo


// ================= IMPORTS ===============================//
// Se importa el modelo para poder crear objetos con mongoose y trabajar con la DB
const { response } = require('express'); // sirve para definir el tipo de la respuesta y tener las ayudas en VSCODE
const User = require('../models/user.model');
const Medic = require('../models/medic.model');
const Hospital = require('../models/hospital.model');



/////////////////// CONTROLLER FOR GLOBAL SEARCH ///////////////////////////////
const getAll = async (req, res = response) => {
    
    const search = req.params.search;
    const regex = new RegExp(search, 'i'); 
    
    



    const [users, medics, hospitals] = await Promise.all([
// El método find recibe un objeto con el parametro de busqueda
         User.find({ name: regex }),
         Medic.find({ name: regex }),
         Hospital.find({ name: regex })
    ]);
  
  

        res.json({
            ok:true,
            users,
            medics,
            hospitals
        })
        
    
}


//////////////////// CONTROLLER FOR SEARCH BY COLLECTION //////////////////////////////////
const getDocumentsByCollection = async (req, res = response) => {
    
    const table = req.params.table;
    const search = req.params.search;

    const regex = new RegExp(search, 'i'); 
    let data = [];
    
    switch(table) {
        case 'medics':
        data = await Medic.find({ name: regex })
                          .populate('user','name img')
                          .populate('hospital','name img')
        break;


        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                 .populate('user','name img')
        break;


        case 'users':
            data = await User.find({ name: regex });

          
        break;

        default:
             return res.status(400).json({
                 ok:false,
                 msg:'The table does not exist in DB'
             })
        
    }
    

    res.json({
        ok:true,
        data
    })
    
}

module.exports = {
    getAll,
    getDocumentsByCollection
}