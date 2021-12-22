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

// ========================= MIDDLEWARES (respetar orden)========================================//
// Configurar CORS
app.use(cors());

// Lectura y parseo del body (debe ir antes de las rutas)
app.use(express.json())

// Rutas
// Se le pasa la ruta que llamará el controlador
app.use('/api/users', require('./routes/users.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/medics', require('./routes/medics.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/busquedas.route'));
app.use('/api/upload', require('./routes/uploads.route'));


// ============================== DATABASE =========================================//
// Base de datos

dbConenction();

//Directorio público
app.use(express.static('public'));



// Obteniendo el puerto desde variables de entorno
const { PORT } = process.env;



//========================== LEVANTAR EL SERVIDOR EXPRESS ============================//
app.listen(PORT, () => {
    
    console.log('Servidor corriendo en puerto:', PORT);
})






