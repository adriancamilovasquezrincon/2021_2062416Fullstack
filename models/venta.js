import mongoose from 'mongoose';

const VentaSchema=mongoose.Schema({
    usuario:{type:mongoose.Schema.Types.ObjectId,ref:'usuario', required:true},
    persona:{type:mongoose.Schema.Types.ObjectId,ref:'persona', required:true},
    tipoComprobante:{type:String,maxlength:20},
    serieComprobante:{type:String, maxlength:20},
    numComprobante:{type:String,maxlength:20},
    impuesto:{type:String, maxlength:20},
    total:{type:String,maxlength:15},
    detalles:[{
        _id: {type:String, required:true},
        articulo: {type:String, required:true},
        cantidad: {type:Number, required:true},
        precio: {type:Number, required:true},
        descuento: {type:Number, required:true},
    }],
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
})

export default mongoose.model('venta',VentaSchema);