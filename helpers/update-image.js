const fs = require('fs');

const User = require('../models/user.model');
const Medic = require('../models/medic.model');
const Hospital = require('../models/hospital.model');



const updateImg = async (type, id, fileName) => {

  try {
    let oldPath = ' ';
 
    switch(type){
        case 'medics':
          const medic = await Medic.findById(id);
          if( !medic){
              return false;
          }

           oldPath = `./uploads/medics/${medic.img}`;
           if(fs.existsSync(oldPath)){
            // erase previous image  
            fs.unlinkSync(oldPath);
          }
         
          medic.img = fileName;
          await medic.save();
          return true;

        break;


        case 'hospitals':
          const hospital = await Hospital.findById(id);
          if( !hospital){
              return false;
          }

          oldPath = `./uploads/hospitals/${hospital.img}`;
          
          if(fs.existsSync(oldPath)){
            // erase previous image  
            fs.unlinkSync(oldPath);
          }

          hospital.img = fileName;
          await hospital.save();
          return true;

        break;


        case 'users':
          const user = await User.findById(id);
          if( !user){
              return false;
          }

           oldPath = `./uploads/users/${user.img}`;
          
          if(fs.existsSync(oldPath)){
            // erase previous image  
            fs.unlinkSync(oldPath);
          }

          user.img = fileName;
          await user.save();
          return true;

        break;
    }

  } catch (error) {
    console.log(error)
  }
  
 
}









module.exports = {
    updateImg
}



