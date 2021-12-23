/* 
   Path: /api/hospitals
*/

// ================= IMPORTS ===========================//
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');


const router = Router();

// =============== ROUTES ==============================//

router.get('/', getHospitals);

router.post('/',
[
   validateJWT, 
   check('name', 'The name of the hospital is required').not().isEmpty(),
   validateFields
], 
createHospital
);


router.put('/:id',
[
  validateJWT,
  check('name', 'The name of the hospital is required').not().isEmpty(),
  validateFields
],
updateHospital
);


router.delete('/:id',validateJWT,deleteHospital);




module.exports = router;