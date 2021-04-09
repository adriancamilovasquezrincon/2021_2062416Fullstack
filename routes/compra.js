import { Router } from 'express';
import { check } from 'express-validator';
import { compras } from '../controllers/compra.js';
import { existeCompraById } from '../db-helpers/compra.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeCompraByUsuario } from '../db-helpers/compra.js';
import { existeCompraByPersona } from '../db-helpers/compra.js';
import { existeCompraByDetalles } from '../db-helpers/compra.js';
import { existeCompraByImpuesto } from '../db-helpers/compra.js';
import { existeCompraByTotal } from '../db-helpers/compra.js';
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
    check('usuario', 'El usuario es obligatorio para su Compra').not().isEmpty(),
    check('usuario').custom(existeCompraByUsuario),
    check('persona', 'La persona es obligatoria para su Compra').not().isEmpty(),
    check('persona').custom(existeCompraByPersona),
    check('detalles', 'La detalles es obligatoria para su Compra').not().isEmpty(),
    check('detalles').custom(existeCompraByDetalles),
    check('impuesto', 'El impuesto es obligatorio para su Compra').not().isEmpty(),
    check('impuesto').custom(existeCompraByImpuesto),
    check('total', 'El total es obligatorio para su Compra').not().isEmpty(),
    check('total').custom(existeCompraByTotal),
    validarCampos
], compras.comprasPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
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