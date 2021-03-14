import {Router} from 'express';
import { check } from 'express-validator';
import {personas} from '../controllers/persona.js';
import { existePersonaById } from '../db-helpers/persona.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existePersonaByNombre } from '../db-helpers/persona.js';
const router=Router();
router.get('/',personas.personaGet);
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personas.personaGetById);
router.post('/',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    check('nombre').custom(existePersonaByNombre)
],personas.personaPost);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),],personas.personaPut);
router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),],personas.personaActivar);
router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),],personas.personaDesactivar);

export default router;