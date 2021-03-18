import { Router } from 'express';
import { check } from 'express-validator';
import { compras } from '../controllers/compra.js';
import { existeCompraById } from '../db-helpers/compra.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeCompraByNombre } from '../db-helpers/compra.js';
import {validarJWT} from '../middlewares/validar-JWT.js'
const router = Router();
router.get('/',[
    validarJWT,
    validarCampos
], compras.comprasGet);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos
], compras.comprasById);
router.post('/', [
    check('usuario', 'El nombre es obligatorio para su Articulo').not().isEmpty(),
    check('usuario').custom(existeCompraByNombre),
    validarCampos
], compras.comprasPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('usuario').custom(existeCompraByNombre),
    check('id').custom(existeCompraById),], compras.comprasPut);
router.put('/activar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),], compras.comprasActivar);
router.put('/desactivar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),], compras.comprasDesactivar);
router.delete('/borrar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),], compras.comprasDelete);

export default router;