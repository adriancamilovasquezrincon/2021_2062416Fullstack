import {Router} from 'express';
import { check } from 'express-validator';
import {usuarios} from '../controllers/usuario.js';
import { existeUsuarioById } from '../db-helpers/usuario.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeUsuarioByNombre } from '../db-helpers/usuario.js';
import { existeUsuarioByEmail } from '../db-helpers/usuario.js';
import { existeUsuarioByPassword } from '../db-helpers/usuario.js';
import {validarJWT} from '../middlewares/validar-JWT.js'

const router=Router();
router.get('/',[
    validarCampos,
    validarJWT
],usuarios.usuarioGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuarios.usuarioGetById);
router.post('/',[
    check('nombre', 'El nombre es obligatorio para el Usuario').not().isEmpty(),
    check('nombre').custom(existeUsuarioByNombre),
    check('email', 'El email es obligatorio para el Usuario').not().isEmpty(),
    check('email').custom(existeUsuarioByEmail),
    check('password', 'El password es obligatorio para el Usuario').not().isEmpty(),
    check('password').custom(existeUsuarioByPassword),
    validarCampos
],usuarios.usuarioPost);
router.post('/login',usuarios.login);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre').custom(existeUsuarioByNombre),
    check('id').custom(existeUsuarioById),],usuarios.usuarioPut);
router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),],usuarios.usuarioActivar);
router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),],usuarios.usuarioDesactivar);

export default router;