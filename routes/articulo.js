import { Router } from 'express';
import { check } from 'express-validator';
import { articulos } from '../controllers/articulo.js';
import { existeArticuloById } from '../db-helpers/articulo.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeArticuloByNombre } from '../db-helpers/articulo.js';
import {validarJWT} from '../middlewares/validar-JWT.js'
const router = Router();
router.get('/',[
    validarJWT,
    validarCampos
], articulos.articuloGet);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
], articulos.articuloById);
router.post('/', [
    check('nombre', 'El nombre es obligatorio para su Articulo').not().isEmpty(),
    check('nombre').custom(existeArticuloByNombre),
    validarCampos
], articulos.articuloPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    check('nombre').custom(existeArticuloByNombre)
], articulos.articuloPut);
router.put('/activar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),]
    , articulos.articuloActivar);
router.put('/desactivar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),], articulos.articuloDesactivar);
router.delete('/borrar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),], articulos.articuloDelete);

export default router;