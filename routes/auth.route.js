/*
   Path: /api/login
*/

// ================= IMPORTS ===========================//
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields.js')

const router = Router();


router.post('/',
[
   check('email','The email is required.').isEmail(),
   check('password', 'The password is required').not().isEmpty(),
   validateFields
],
login
)


router.post('/google',
[
   
   check('token', 'The google token is required').not().isEmpty(),
   validateFields
],
googleSignIn
)










module.exports = router;

