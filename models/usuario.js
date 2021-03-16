import mongoose from 'mongoose';

const UsuarioSchema=mongoose.Schema({
    nombre:{type:String,maxlength:50,unique:true},
    apellido:{type:String,maxlength:50},
    email:{type:String,required:true,maxlength:50,unique:true},
    correo:{type:String,maxlength:50,unique:true},
    password:{type:String,required:true},
    cedula:{type:String},
    rol:{type:String,maxlength:20},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

export default mongoose.model('usuario', UsuarioSchema);