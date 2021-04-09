import Compra from "../models/compra.js";

const existeCompraById=async(id)=>{
    const existe=await Compra.findById(id)

    if ( ! existe ) throw new Error(`No existe Compra para este ID ${id}`)
}

const existeCompraByUsuario=async(usuario)=>{
    const existe=await Compra.findOne({usuario})

    if (!existe) throw new Error ('Ya existe una Compra con ese usuario')
}
const existeCompraByPersona=async(persona)=>{
    const existe=await Compra.findOne({persona})

    if (!existe) throw new Error ('Ya existe una Compra con ese persona')
}
const existeCompraByDetalles=async(detalles)=>{
    const existe=await Compra.findOne({detalles})

    if (!existe) throw new Error ('Ya existe una Compra con ese detalle')
}
const existeCompraByImpuesto=async(impuesto)=>{
    const existe=await Compra.findOne({impuesto})

    if (!existe) throw new Error ('Ya existe una Compra con ese impuesto')
}
const existeCompraByTotal=async(total)=>{
    const existe=await Compra.findOne({total})

    if (!existe) throw new Error ('Ya existe una Compra con ese total')
}

export {existeCompraById, existeCompraByUsuario,existeCompraByPersona,existeCompraByDetalles,existeCompraByImpuesto,existeCompraByTotal};