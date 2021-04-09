import Persona from "../models/persona.js";

const existePersonaById=async(id)=>{
    const existe=await Persona.findById(id)

    if ( ! existe ) throw new Error(`No existe Persona para este ID ${id}`)
}
const existePersonaByNombre=async(nombre)=>{
    const existe=await Persona.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Persona con ese nombre')
}
const existePersonaBytipoPersona=async(tipoPersona)=>{
    const existe=await Persona.findOne({tipoPersona})

    if (existe) throw new Error ('Ya existe una Persona con ese tipoPersona')
}
const existePersonaBytipoDocumento=async(tipoDocumento)=>{
    const existe=await Persona.findOne({tipoDocumento})

    if (existe) throw new Error ('Ya existe una Persona con ese tipoDocumento')
}
const existePersonaByPassword=async(Password)=>{
    const existe=await Persona.findOne({Password})

    if (existe) throw new Error ('Ya existe una Persona con ese Password')
}

const existePersonaBynumDocumento=async(numDocumento)=>{
    const existe=await Persona.findOne({numDocumento})

    if (existe) throw new Error ('Ya existe una Persona con ese numDocumento')
}
const existePersonaByDireccion=async(Direccion)=>{
    const existe=await Persona.findOne({Direccion})

    if (existe) throw new Error ('Ya existe una Persona con ese Direccion')
}
const existePersonaByTelefono=async(Telefono)=>{
    const existe=await Persona.findOne({Telefono})

    if (existe) throw new Error ('Ya existe una Persona con ese Telefono')
}
const existePersonaByEmail=async(Email)=>{
    const existe=await Persona.findOne({Email})

    if (existe) throw new Error ('Ya existe una Persona con ese Email')
}


export {existePersonaById, existePersonaByNombre,existePersonaBytipoPersona,existePersonaBynumDocumento,existePersonaBytipoDocumento,existePersonaByPassword,existePersonaByDireccion,existePersonaByTelefono,existePersonaByEmail};