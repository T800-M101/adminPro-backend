const { response } = require('express');
const { validationResult } = require('express-validator');



const validateFields = (req, res = response, next) => {

   // captando los errores que no pasaron la validación
  const errores = validationResult(req);

  if(!errores.isEmpty()){
    return res.status(400).json({
        ok: false,
        errors: errores.mapped()
    })
  }

  next();
}

module.exports = {validateFields};







