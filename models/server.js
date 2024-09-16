const express = require('express')
const cors = require('cors')

const { bdmysql } = require('../database/MariaDbConnection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.pathsMySql = {
            auth: '/api/auth',
            persona: '/api/persona',
            usuario: '/api/usuario',
        }

        /*
        this.app.get('/', functioWn (req, res) {
            res.send('Hola Mundo a todos...')
        })
        */

        //Aqui me conecto a la BD
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    }

    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    routes() {
    //this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));
    this.app.use(this.pathsMySql.persona, require('../routes/persona'));
    this.app.use(this.pathsMySql.usuario, require('../routes/usuario'));
    }

    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
