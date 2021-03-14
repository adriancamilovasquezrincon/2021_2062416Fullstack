import mongoose from 'mongoose';

const PersonaSchema=mongoose.Schema({
    tipoPersona:{type:String,required:true,maxlength:50,unique:true},
    nombre:{type:String,required:true,maxlength:50},
    tipoDocumento:{type:String,required:true,maxlength:50,unique:true},
    password:{type:String,required:true},
    numDocumento:{type:String,required:true},
    direccion:{type:String,required:true},
    telefono:{type:String,required:true,maxlength:20},
    email:{type:String,required:true,maxlength:50,unique:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

export default mongoose.model('persona', PersonaSchema);