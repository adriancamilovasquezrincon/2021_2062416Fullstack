import {Router} from 'express';
import { check } from 'express-validator';
import {ventas} from '../controllers/venta.js';
import { existeVentaById } from '../db-helpers/venta.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeVentaByNombre } from '../db-helpers/venta.js';

const router=Router();
router.get('/',ventas.ventasGet);
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
],ventas.ventasById);
router.post('/',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaByNombre)
],ventas.ventasPost);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),],ventas.ventasPut);
router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),],ventas.ventasActivar);
router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),],ventas.ventasDesactivar);
router.delete('/borrar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),], ventas.ventasDelete);

export default router;