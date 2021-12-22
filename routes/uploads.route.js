/*
   ruta: api/upload/
*/


// ================= IMPORTS ===========================//
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImage } = require('../controllers/uploads.controller');
const { append } = require('express/lib/response');


const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateJWT, fileUpload);

router.get('/:type/:img', getImage);



module.exports = router;