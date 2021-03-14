import Compra from "../models/compra.js";

const existeCompraById=async(id)=>{
    const existe=await Compra.findById(id)

    if ( ! existe ) throw new Error(`No existe Compra para este ID ${id}`)
}

const existeCompraByNombre=async(nombre)=>{
    const existe=await Compra.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Compra con ese nombre')
}

export {existeCompraById, existeCompraByNombre};