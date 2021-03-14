import mongoose from  'mongoose';

const CompraSchema=mongoose.Schema({
    usuario:{type:String, required:true,unique:true},
    persona:{type:String, required:true, maxlength:50},
    tipoComprobante:{type:String,maxlength:20},
    serieComprobante:{type:String, maxlength:20},
    numComprobante:{type:String,maxlength:20},
    impuesto:{type:String, maxlength:20},
    total:{type:String,maxlength:15},
    detalles:[{type:Array,maxlength:20,required:true,unique:true}],
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
})

export default mongoose.model('compra',CompraSchema);