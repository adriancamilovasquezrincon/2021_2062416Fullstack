import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs';
import {generarJWT} from '../middlewares/validar-JWT.js'
const usuarios = {
    usuarioGet: async (req, res) => {
        const { value } = req.query;
        const usuario = await Usuario
            .find({
                $or: [
                    { nombre: new RegExp(value, 'i') },
                    { email: new RegExp(value, 'i') },
                    { password: new RegExp(value, 'i') },
                    { rol: new RegExp(value, 'i') },
                    { cedula: new RegExp(value, 'i') },
                    { apellido: new RegExp(value, 'i') },
                    { correo: new RegExp(value, 'i') },
                ]
            })
            .sort({ 'createdAt': -1 })
        res.json({
            usuario
        })
    },
    usuarioPost: async (req, res) => {
        const { nombre, email, password, rol, cedula, apellido, correo } = req.body;
        const usuario = new Usuario({ nombre, email, password, rol, cedula, apellido, correo })

        const salt=bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password,salt)

        await usuario.save();
        res.json({
            usuario
        })
    },
    login: async (req,res)=>{
        const {email,password}=req.body;
        const usuario=await Usuario.findOne({email})
        if(! usuario){
            return res.json({
                msg:'Usuario/Password no son correctos correo'
            })
        }
        if (usuario.estado===0){
            return res.json({
                msg:'Usuario/Password no son correctos:Estado'
            })
        }
        const validarPassword=bcryptjs.compareSync(password,usuario.password)
        if(! validarPassword){
            return res.json({
                msg: 'Usuario/Password no son correctos:Password'
            })
        }
        const token= await generarJWT(usuario.id)

        return res.json({
            usuario, 
            token
        })
    },
    usuarioGetById: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findById({ _id:id })
        res.json({
            usuario
        })
    },
    usuarioPut: async (req, res) => {
        const { id } = req.params;
        const { _id, email, correo,apellido, createdAt, __v, rol, estado, password, ...resto } = req.body

        if(password){
            const salt=bcryptjs.genSaltSync();
            resto.password=bcryptjs(password,salt)
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto)

        res.json({
            usuario
        })
    },
    usuarioActivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 })
        res.json({
            usuario
        })
    },
    usuarioDesactivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 })
        res.json({
            usuario
        })
    }
}

export { usuarios };