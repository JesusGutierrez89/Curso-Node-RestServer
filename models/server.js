const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        //concetar a BD
        this.concectarDB();

        //midlewares
        this.midlewares();
       

        //Rutas de mi aplicacion
        this.routes();
    }
    
    async concectarDB(){
        await dbConnection();
    }
    midlewares(){
        //Directorio publico
        this.app.use(express.static('public'));
        this.app.use(cors());
        //Lrctura y Parseo del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

module.exports = Server;