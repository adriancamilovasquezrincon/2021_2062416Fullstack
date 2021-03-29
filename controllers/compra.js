import Compra from '../models/compra.js'
import Articulo from '../models/articulo.js'
const compras = {
    comprasGet: async (req, res) => {
        const { value } = req.query;
        const compra = await Compra
            .find({
                $or: [
                    { tipoComprobante: new RegExp(value, 'i') },
                    { serieComprobante: new RegExp(value, 'i') },
                    { numComprobante: new RegExp(value, 'i') },
                    { impuesto: new RegExp(value, 'i') },
                    { total: new RegExp(value, 'i') },
                    { detalle: new RegExp(value, 'i') },
                ]
            })
            .populate('usuario', 'nombre')
            .populate('persona','tipoPersona')
            .sort({ 'createdAt': -1 })
        res.json({
            compra
        })
    },
    comprasPost: async (req, res) => {
        console.log(req.body)
        const { usuario, persona,tipoComprobante,serieComprobante,numComprobante, impuesto, total, detalles } = req.body;
        const compra = new Compra({  usuario, persona,tipoComprobante,serieComprobante,numComprobante, impuesto, total, detalles})

        await compra.save();
        detalles.map((articulo)=>(
            aumentarStock(articulo._id,articulo.cantidad))
        )

        res.json({
            compra
        })

    },
    comprasById: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findById({ _id: id })
        res.json({
            compra
        })
    },
    comprasPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createdAt, __v, estado, ...resto } = req.body;

        const compra = await Compra.findByIdAndUpdate(id, resto)

        res.json({
            compra
        })
    },
    comprasActivar: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findByIdAndUpdate(id, { estado: 1 })

        aumentarStock
        res.json({
            compra
        })
    },
    comprasDesactivar: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findByIdAndUpdate(id, { estado: 0 })

        disminuirStock
        res.json({
            compra
        })
    },
    comprasDelete: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findByIdAndDelete(id)

        res.json({
            compra
        })
    }
},
aumentarStock= async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)+parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
},
disminuirStock= async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)-parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
}
export { compras };