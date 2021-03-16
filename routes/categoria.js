import { Router } from 'express';
import { check } from 'express-validator';
import { categorias } from '../controllers/categoria.js';
import { existeCategoriaById } from '../db-helpers/categoria.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeCategoriaByNombre } from '../db-helpers/categoria.js';
import {validarJWT} from '../middlewares/validar-JWT.js'
const router = Router();
router.get('/',[
    validarJWT,
    validarCampos
], categorias.categoriaGet);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categorias.categoriaById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio para su Categoria').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],
    categorias.categoriaPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre)
], categorias.categoriaPut);

router.put('/activar/:id', [check('id', 'No es un ID válido').isMongoId(),
check('id').custom(existeCategoriaById),
], categorias.categoriaActivar);

router.put('/desactivar/:id', [check('id', 'No es un ID válido').isMongoId(),
check('id').custom(existeCategoriaById),
], categorias.categoriaDesactivar);

router.delete('/:id', [check('id', 'No es un ID válido').isMongoId(),
check('id').custom(existeCategoriaById),
], categorias.categoriaDelete);

export default router;
