import Articulo from '../models/articulo.js'
const articulos = {
    articuloGet: async (req, res) => {
        const { value } = req.query;
        const articulo = await Articulo
            .find({
                $or: [
                    { codigo: new RegExp(value, 'i') },
                    { nombre: new RegExp(value, 'i') },
                    { descripcion: new RegExp(value, 'i') },
                    { precioVenta: new RegExp(value, 'i') },
                    { stock: new RegExp(value, 'i') },
                ]
            })
            .populate('categoria','nombre')
            .sort({ 'createdAt': -1 })
        res.json({
            articulo
        })
    },

    articuloPost: async (req, res) => {
        console.log(req.body)
        const {categoria, codigo, nombre, descripcion, precioVenta, stock } = req.body;
        const articulo = new Articulo({ categoria,codigo, nombre, descripcion, precioVenta, stock })

        await articulo.save();
        res.json({
            articulo
        })

    },
    articuloById: async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo.findById({ _id: id })
        res.json({
            articulo
        })
    },
    articuloPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createdAt, __v, estado, ...resto } = req.body;

        const articulo = await Articulo.findByIdAndUpdate(id, resto)

        res.json({
            articulo
        })
    },
    articuloActivar: async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            articulo
        })
    },
    articuloDesactivar: async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            articulo
        })
    },
    articuloDelete: async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo.findByIdAndDelete(id)

        res.json({
            articulo
        })
    }
}

export { articulos };