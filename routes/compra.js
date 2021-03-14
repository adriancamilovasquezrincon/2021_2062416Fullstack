import { Router } from 'express';
import { check } from 'express-validator';
import { compras } from '../controllers/compra.js';
import { existeCompraById } from '../db-helpers/compra.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeCompraByNombre } from '../db-helpers/compra.js';
const router = Router();
router.get('/', compras.comprasGet);
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos
], compras.comprasById);
router.post('/', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
    check('nombre').custom(existeCompraByNombre)
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