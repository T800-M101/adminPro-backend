const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require("../helpers/update-image");


const fileUpload = (req, res = response) => {

    // Se obtienen estos valores tomdas de la ruta. Son identificadas por su posición en la ruta de acuerdo al
    // al diseño de la ruta  'router.put('/:type/:id', validateJWT, fileUpload)'

    const type = req.params.type;
    const id = req.params.id;

    // Validar type
    const validTypes = ['hospitals','users','medics'];

    if(!validTypes.includes(type)){
         res.status(400).json({
             ok: false,
             msg:'It is not a medic, user or hospital type.'
         });
    }
  // Validate file existance
    if(!req.files || Object.keys(req.files).length === 0){
       return res.status(400).json({
           ok:false,
           msg:'No files were uploaded.'
    });
}

    // Process image
     const file = req.files.image;

     // Extract file extension (split return an array with the elements divides by the period)
     const shortName = file.name.split('.');

     const fileExtension = shortName.pop();
     

     // Validate Extension
     const validExtensions = ['png','jpg','jpeg','gif'];

     if(!validExtensions.includes(fileExtension)){
        return res.status(400).json({
            ok:false,
            msg:'Extension is not allowed.'
     });

     }

     // Generate file nameusing uuid
     const fileName = `${uuidv4()}.${fileExtension}`;

     // Create path to store image
     const path = `./uploads/${type}/${fileName}`;

     // Use the mv() method to place the file somewhere on your server
     file.mv(path, (err) => {
         
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: true,
                msg:'Error while uploading the file.'
            });
        } 
        
        // Update database
        updateImg(type, id, fileName);


        res.json({
            ok:true,
            msg:'File uploaded.'
     });

    }); 
}


const getImage = (req, res = response) => {
   const type = req.params.type;
   const img = req.params.img;

   const imgPath = path.join(__dirname,`../uploads/${type}/${img}`);

   // image by defect

   if(fs.existsSync(imgPath)){
       res.sendFile(imgPath)
   }else {
    const imgPath = path.join(__dirname,'../uploads/no-image.jpg');
    res.sendFile(imgPath);

   }

}







module.exports = {
    fileUpload,
    getImage
}