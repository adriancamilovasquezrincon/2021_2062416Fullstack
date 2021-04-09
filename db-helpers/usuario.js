import Usuario from "../models/usuario.js";

const existeUsuarioById=async(id)=>{
    const existe=await Usuario.findById(id)

    if ( ! existe ) throw new Error(`No existe Usuario para este ID ${id}`)
}

const existeUsuarioByNombre=async(nombre)=>{
    const existe=await Usuario.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Usuario con ese nombre')
}
const existeUsuarioByEmail=async(email)=>{
    const existe=await Usuario.findOne({email})

    if (existe) throw new Error ('Ya existe una Usuario con ese email')
}
const existeUsuarioByPassword=async(password)=>{
    const existe=await Usuario.findOne({password})

    if (existe) throw new Error ('Ya existe una Usuario con ese password')
}

export {existeUsuarioById, existeUsuarioByNombre,existeUsuarioByEmail,existeUsuarioByPassword};