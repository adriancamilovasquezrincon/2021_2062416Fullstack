import Venta from "../models/venta.js";

const existeVentaById=async(id)=>{
    const existe=await Venta.findById(id)

    if ( ! existe ) throw new Error(`No existe Venta para este ID ${id}`)
}

const existeVentaByUsuario=async(usuario)=>{
    const existe=await Venta.findOne({usuario})

    if (!existe) throw new Error ('Ya existe una Venta con ese usuario')
}
const existeVentaByPersona=async(persona)=>{
    const existe=await Venta.findOne({persona})

    if (!existe) throw new Error ('Ya existe una Venta con ese persona')
}
const existeVentaByDetalles=async(detalles)=>{
    const existe=await Venta.findOne({detalles})

    if (!existe) throw new Error ('Ya existe una Venta con ese detalle')
}
const existeVentaByImpuesto=async(impuesto)=>{
    const existe=await Venta.findOne({impuesto})

    if (!existe) throw new Error ('Ya existe una Venta con ese impuesto')
}
const existeVentaByTotal=async(total)=>{
    const existe=await Venta.findOne({total})

    if (!existe) throw new Error ('Ya existe una Compra con ese total')
}

export {existeVentaById, existeVentaByUsuario,existeVentaByPersona,existeVentaByDetalles,existeVentaByImpuesto,existeVentaByTotal};