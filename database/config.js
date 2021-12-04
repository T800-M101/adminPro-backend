const mongoose = require('mongoose');
require('dotenv').config();


const { DB_CNN } = process.env;

const dbConenction = async () => {
    
    try {
        await mongoose.connect(DB_CNN);

        console.log('DB Online...');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicial la BD. Ver logs.');
    }
    


}



module.exports = {
    dbConenction
}
