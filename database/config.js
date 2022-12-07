const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect( "mongodb+srv://sebas9899:jiVyLFXTovktXkfY@cluster0.2lqfgbf.mongodb.net/test" );
        console.log("Conexión exitosa a BD online");

    } catch (error) {
        
        throw new Error('Error en la inicialización de la BD')

    }

}





module.exports = {
    dbConnection,
}