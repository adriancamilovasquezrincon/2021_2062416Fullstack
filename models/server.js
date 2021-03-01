import express from 'express';
import cors from 'cors';
import dbConection from '../database/config.js';

import categoria from '../models/categoria.js';
class Server{
    constructor (){
        // crear servidor
        // conectar a la red
        // middlewares
        // rutas o routes
        this.port = process.env.PORT
        this.app =express();
        this.middlewares();
        this.dbConexion();
        this.routes();
    }

    routes(){
        this.app.use('/api/categoria',categoria)
    }


    
    async dbConexion(){
       await dbConection()
    }

        
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port} - ctrl + c para detenerse `);
        })
    }
}
export {Server}


