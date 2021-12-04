//========================== IMPORTS ============================================//
require('dotenv').config();


// Importar el servidor Express
const express = require('express');
const cors = require('cors');
// Importar Mongoose ORM Database connection
const { dbConnection, dbConenction } = require('./database/config');



//=========================== CONFIGURACIONES ===================================//

// Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos

dbConenction();
// Obteniendo el puerto desde variables de entorno
const { PORT } = process.env;

//============================= RUTAS ============================================//

app.get( '/', (req, res) => {
   
   
 // Aquí el req viene por el body y se retorna el body de la respuesta mediante un objeto
    res.json({
        ok:true,
        msj: 'Hola Mundo'
    })
});


//========================== LEVANTAR EL SERVIDOR EXPRESS ============================//
app.listen(PORT, () => {
    
    console.log('Servidor corriendo en puerto:', PORT);
})






