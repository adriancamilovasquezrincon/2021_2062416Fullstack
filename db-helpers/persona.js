import Persona from "../models/persona.js";

const existePersonaById=async(id)=>{
    const existe=await Persona.findById(id)

    if ( ! existe ) throw new Error(`No existe Persona para este ID ${id}`)
}

const existePersonaByNombre=async(nombre)=>{
    const existe=await Persona.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Persona con ese nombre')
}

export {existePersonaById, existePersonaByNombre};