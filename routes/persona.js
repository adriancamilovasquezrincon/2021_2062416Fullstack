import {Router} from 'express';
import { check } from 'express-validator';
import {personas} from '../controllers/persona.js';
import { existePersonaById } from '../db-helpers/persona.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existePersonaByNombre } from '../db-helpers/persona.js';
import { existePersonaBytipoPersona } from '../db-helpers/persona.js';
import { existePersonaBytipoDocumento } from '../db-helpers/persona.js';
import { existePersonaByPassword } from '../db-helpers/persona.js';
import { existePersonaBynumDocumento } from '../db-helpers/persona.js';
import { existePersonaByDireccion } from '../db-helpers/persona.js';
import { existePersonaByTelefono } from '../db-helpers/persona.js';
import { existePersonaByEmail } from '../db-helpers/persona.js';

import {validarJWT} from '../middlewares/validar-JWT.js'
const router=Router();
router.get('/',[
    validarJWT,
    validarCampos
],personas.personaGet);
router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personas.personaGetById);
router.post('/',[
    check('nombre', 'El nombre es obligatorio para la Persona').not().isEmpty(),
    check('nombre').custom(existePersonaByNombre),
    check('tipoPersona', 'El tipoPersona es obligatorio para la Persona').not().isEmpty(),
    check('tipoPersona').custom(existePersonaBytipoPersona),
    check('tipoDocumento', 'El tipoDocumento es obligatorio para la Persona').not().isEmpty(),
    check('tipoDocumento').custom(existePersonaBytipoDocumento),
    check('password', 'El password es obligatorio para la Persona').not().isEmpty(),
    check('password').custom(existePersonaByPassword),
    check('numDocumento', 'El numDocumento es obligatorio para la Persona').not().isEmpty(),
    check('numDocumento').custom(existePersonaBynumDocumento),
    check('direccion', 'El direccion es obligatorio para la Persona').not().isEmpty(),
    check('direccion').custom(existePersonaByDireccion),
    check('telefono', 'El telefono es obligatorio para la Persona').not().isEmpty(),
    check('telefono').custom(existePersonaByTelefono),
    check('email', 'El email es obligatorio para la Persona').not().isEmpty(),
    check('email').custom(existePersonaByEmail),
    validarCampos
],personas.personaPost);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre').custom(existePersonaByNombre),
    check('id').custom(existePersonaById),],personas.personaPut);
router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),],personas.personaActivar);
router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),],personas.personaDesactivar);

export default router;