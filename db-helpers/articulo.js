import Articulo from "../models/articulo.js";

const existeArticuloById=async(id)=>{
    const existe=await Articulo.findById(id)

    if ( ! existe ) throw new Error(`No existe Articulo para este ID ${id}`)
}

const existeArticuloByNombre=async(nombre)=>{
    const existe=await Articulo.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Articulo con ese nombre')
}

export {existeArticuloById, existeArticuloByNombre};