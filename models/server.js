const express = require('express')
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        //midlewares
        this.midlewares();
       

        //Rutas de mi aplicacion
        this.routes();
    }
    midlewares(){
        //Directorio publico
        this.app.use(express.static('public'));
        this.app.use(cors());
        //Lrctura y Parseo del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

module.exports = Server;
