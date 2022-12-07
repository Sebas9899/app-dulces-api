const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = 3000 || 5000;
        this.usersPath = '/api/users';
        this.dulcesPath = '/api/dulces';

        // Conexión a la BD
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas del app
        this.routes();
    }

    async conectarDB() {

        await dbConnection();
        
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static("public") );

    }

    routes() {
        
        this.app.use( this.usersPath , require('../routes/user'));
        this.app.use( this.dulcesPath , require('../routes/dulce'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log("localhost:",this.port);
        });
    }
}

module.exports = Server;