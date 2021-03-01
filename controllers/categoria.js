import Categoria from '../models/categoria.js'

const categoriaGet=async(req, res)=>{
    const {value}=req.query;
    const categoria=Categoria
    .find({
        $or:[
            {nombre:new RegExp(value, 'i')},
            {descripcion:new RegExp(value, 'i')},
        ]
    })
    .sort({'createdAt':-1})
    res.json({
        categoria
    })
}

const categoriaPost=async(req,res)=>{
    const {nombre,descripcion}=req.body;
    const categoria =new categoria({nombre,descripcion})

    await categoria.save();
    res.json({
        categoria
    })

}
const categoriaById= async(req,res)=>{
    const {id}=req.params;
    const categoria=await categoria.findOne({_id:id})
    res.json({
        categoria
    })
}
export {categoriaGet, categoriaPost, categoriaById}