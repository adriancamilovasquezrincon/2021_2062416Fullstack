import {Router} from 'express';
import { check } from 'express-validator';
import {ventas} from '../controllers/venta.js';
import { existeVentaById } from '../db-helpers/venta.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeVentaByNombre } from '../db-helpers/venta.js';
import {validarJWT} from '../middlewares/validar-JWT.js'
const router=Router();
router.get('/',[
    validarJWT,
    validarCampos
],ventas.ventasGet);
router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
],ventas.ventasById);
router.post('/',[
    check('usuario', 'El usuario es obligatorio para su Venta').not().isEmpty(),
    check('usuario').custom(existeVentaByNombre),
    check('persona', 'El persona es obligatorio para su Venta').not().isEmpty(),
    check('persona').custom(existeVentaByNombre),
    check('detalles', 'El detalle es obligatorio para su Venta').not().isEmpty(),
    check('detalles').custom(existeVentaByNombre),
    validarCampos
],ventas.ventasPost);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('usuario').custom(existeVentaByNombre),
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