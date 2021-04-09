import Articulo from "../models/articulo.js";

const existeArticuloById=async(id)=>{
    const existe=await Articulo.findById(id)

    if ( ! existe ) throw new Error(`No existe Articulo para este ID ${id}`)
}

const existeArticuloByNombre=async(nombre)=>{
    const existe=await Articulo.findOne({nombre})

    if (!existe) throw new Error ('Ya existe una Articulo con ese nombre')
}
const existeArticuloByCategoria=async(categoria)=>{
    const existe=await Articulo.findOne({categoria})

    if (!existe) throw new Error ('Ya existe una Articulo con ese categoria')
}
const existeArticuloByCodigo=async(codigo)=>{
    const existe=await Articulo.findOne({codigo})

    if (!existe) throw new Error ('Ya existe una Articulo con ese codigo')
}
const existeArticuloByDescripcion=async(descripcion)=>{
    const existe=await Articulo.findOne({descripcion})

    if (!existe) throw new Error ('Ya existe una Articulo con ese descripcion')
}
const existeArticuloByprecioVenta=async(precioVenta)=>{
    const existe=await Articulo.findOne({precioVenta})

    if (!existe) throw new Error ('Ya existe una Articulo con ese precioVenta')
}
const existeArticuloByStock=async(nombre)=>{
    const existe=await Articulo.findOne({nombre})

    if (!existe) throw new Error ('Ya existe una Articulo con ese nombre')
}



export {existeArticuloById, existeArticuloByNombre,existeArticuloByCategoria,existeArticuloByCodigo,existeArticuloByDescripcion,existeArticuloByprecioVenta,existeArticuloByStock};