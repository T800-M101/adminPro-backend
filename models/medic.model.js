const { Schema, model } = require('mongoose');

// El Schema es la definición de cada uno de los registros que estrá dentro de una colección

const MedicSchema = Schema({
  name: {
     type: String,
     required: true
  },
  img: {
    type: String,
     
  },
  user:{
    require:true,
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  hospital: {
    require:true,
    // Para relacionar con un usuario el hospital
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});


MedicSchema.method('toJSON', function() {
  // Para extraer la version del objeto y que no salga en la respuesta json
  const {__v, ...object} = this.toObject();
  
  return object;
});

module.exports = model( 'Medic', MedicSchema );