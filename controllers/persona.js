import Persona from '../models/persona.js'
import bcryptjs from 'bcryptjs';
const personas = {
    personaGet: async (req, res) => {
        const { value } = req.query;
        const persona = await Persona
            .find({
                $or: [
                    { tipoPersona: new RegExp(value, 'i') },
                    { nombre: new RegExp(value, 'i') },
                    { tipoDocumento: new RegExp(value, 'i') },
                    { numDocumento: new RegExp(value, 'i') },
                    { direccion: new RegExp(value, 'i') },
                    { telefono: new RegExp(value, 'i') },
                    { email: new RegExp(value, 'i') },
                    { password: new RegExp(value, 'i') },
                ]
            })
            .sort({ 'createdAt': -1 })
        res.json({
            persona
        })
    },
    personaPost: async (req, res) => {
        const { tipoPersona, nombre, password,tipoDocumento, numDocumento, direccion, telefono,email } = req.body;
        const persona = new Persona({ tipoPersona, password, nombre, tipoDocumento, numDocumento, direccion, telefono,email })

        const salt=bcryptjs.genSaltSync();
        persona.password=bcryptjs.hashSync(password,salt)

        await persona.save();
        res.json({
            persona
        })
    },
    personaGetById: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findById({ _id:id })
        res.json({
            persona
        })
    },
    personaPut: async (req, res) => {
        const { id } = req.params;
        const { _id, email, apellido, createdAt, __v, estado, password, ...resto } = req.body

        if(password){
            const salt=bcryptjs.genSaltSync();
            resto.password=bcryptjs(password,salt)
        }
        const persona = await Persona.findByIdAndUpdate(id, resto)

        res.json({
            persona
        })
    },
    personaActivar: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findByIdAndUpdate(id, { estado: 1 })
        res.json({
            persona
        })
    },
    personaDesactivar: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findByIdAndUpdate(id, { estado: 0 })
        res.json({
            persona
        })
    }
}

export { personas };