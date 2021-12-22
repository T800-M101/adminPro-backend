/* 
   Path: /api/medics
*/

// ================= IMPORTS ===========================//
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getMedics, createMedic, updateMedic, deleteMedic } = require('../controllers/medics.controller');


const router = Router();

// =============== ROUTES ==============================//

router.get('/', getMedics);
router.post('/',
[
   validateJWT,
   check('name', 'The medic´s name is required').not().isEmpty(),
   check('hospital', 'The hospital ID is required').not().isEmpty(),
   check('hospital', 'The hospital ID must be valid').isMongoId(),
   validateFields
], 
createMedic
);
router.put('/:id',[],updateMedic);
router.delete('/:id',validateJWT,deleteMedic);




module.exports = router;