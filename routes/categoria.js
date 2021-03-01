import {Router} from 'express'
import {categoriaGet, categoriaPost, categoriaById} from '../controllers/categoria.js';

const router=Router();
router.get('/',categoriaGet);
router.get('/:id',categoriaById);
router.post('/',categoriaPost);
router.put('/:id');
router.put('/activar/:id');
router.put('desactivar/:id');
router.delete('/:id');

export default router;