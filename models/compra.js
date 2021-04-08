import mongoose from 'mongoose';

const CompraSchema = mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
    persona: { type: mongoose.Schema.Types.ObjectId, ref: 'persona', required: true },
    tipoComprobante: { type: String, maxlength: 20 },
    serieComprobante: { type: String, maxlength: 20 },
    numComprobante: { type: String, maxlength: 20 },
    impuesto: { type: Number, required:true},
    total: { type: Number, required:true },
    detalles: [{
        _id: { type: String, required: true },
        articulo: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
    }],
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('compra', CompraSchema);