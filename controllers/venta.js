import Venta from '../models/venta.js'
import Articulo from '../models/articulo.js'

const ventas = {
    ventasGet: async (req, res) => {
        const { value } = req.query;
        const venta = await Venta
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
            .populate('persona', 'nombre')
            .sort({ 'createdAt': -1 })
        res.json({
            venta
        })
    },

    ventasPost: async (req, res) => {
        console.log(req.body)
        const { usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles } = req.body;
        const venta = new Venta({ usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles });
        venta.total= venta.detalles.reduce((acc, articulos)=> acc + ((articulos.cantidad * articulos.precio)-articulos.descuento),0)
        venta.impuesto = venta.total *0.19
        await venta.save();
        detalles.map((articulos) => (
            disminuirStock(articulos._id, articulos.cantidad))
        )

        res.json({
            venta
        })

    },
    ventasById: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findById({ _id: id })
        res.json({
            venta
        })
    },
    ventasPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createdAt, __v, estado, ...resto } = req.body;

        const venta = await Venta.findByIdAndUpdate(id, resto)

        res.json({
            venta
        })
    },
    ventasActivar: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findByIdAndUpdate(id, { estado: 1 })
        venta.detalles.map((articulos)=>disminuirStock(articulos._id,articulos.cantidad))
        res.json({
            venta
        })
    },
    ventasDesactivar: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findByIdAndUpdate(id, { estado: 0 })
        venta.detalles.map((articulos)=>aumentarStock(articulos._id,articulos.cantidad))
        res.json({
            venta
        })
    },
    ventasDelete: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findByIdAndDelete(id)

        res.json({
            venta
        })
    }
},
    aumentarStock = async (id, cantidad) => {
        let { stock } = await Articulo.findById(id);
        stock = parseInt(stock) + parseInt(cantidad)
        await Articulo.findByIdAndUpdate({ id }, { stock })
    },
    disminuirStock = async (id, cantidad) => {
        let { stock } = await Articulo.findById(id);
        stock = parseInt(stock) - parseInt(cantidad)
        await Articulo.findByIdAndUpdate({ id }, { stock })
    }
export { ventas };




