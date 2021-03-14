import Venta from "../models/venta.js";

const existeVentaById=async(id)=>{
    const existe=await Venta.findById(id)

    if ( ! existe ) throw new Error(`No existe Venta para este ID ${id}`)
}

const existeVentaByNombre=async(nombre)=>{
    const existe=await Venta.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Venta con ese nombre')
}

export {existeVentaById, existeVentaByNombre};