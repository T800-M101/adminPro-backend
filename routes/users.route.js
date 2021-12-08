/* 
   Path: /api/usuarios
*/

// ================= IMPORTS ===========================//
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

// =============== ROUTES ==============================//
router.get( '/', validateJWT, getUsers);

router.post('/', 
[
    // Aplicando middleware validator
   check('name', 'The name is required.').not().isEmpty(),
   check('password','The password is required').not().isEmpty(),
   check('email','The email does not match the correct format').isEmail(),
   validateFields // custom middleware
],
createUser);


router.put( '/:id', 
[
    validateJWT,
    check('name', 'The name is required.').not().isEmpty(),
    check('email','The email does not match the correct format').isEmail(),
    check('role','The role is required.').not().isEmpty(),
    validateFields,
],
updateUser);


router.delete('/:id', validateJWT , deleteUser);




module.exports = router;