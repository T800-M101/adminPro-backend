/*
   ruta: api/todo/:busqueda
*/


// ================= IMPORTS ===========================//
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getAll, getDocumentsByCollection } = require('../controllers/busquedas.controller');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();


router.get( '/:busqueda', 
[
    validateJWT,
    check('search', 'A term to search is required.').not().isEmpty(),
    validateFields,
],
getAll);

router.get( '/:table/:search', 
[
    validateJWT,
    check('search', 'A term to search is required.').not().isEmpty(),
    validateFields,
],
getDocumentsByCollection);



module.exports = router;


