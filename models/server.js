import express from 'express';
import cors from 'cors';
import dbConection from '../database/config.js';

import categoria from '../routes/categoria.js';
import usuario from '../routes/usuario.js';
import articulo from '../routes/articulo.js';
import venta from '../routes/venta.js';
import compra from '../routes/compra.js'
import persona from '../routes/persona.js'
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
        this.app.use('/api/categoria',categoria),
        this.app.use('/api/usuarios',usuario),
        this.app.use('/api/articulos',articulo),
        this.app.use('/api/ventas',venta),
        this.app.use('/api/compras',compra),
        this.app.use('/api/personas',persona)
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


