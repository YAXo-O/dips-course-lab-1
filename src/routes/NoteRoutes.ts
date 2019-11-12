import {Router} from 'express';
import controller from '@controller/NoteController';
const router = Router();

router.post('/create', controller.createNote);
router.get('/get', controller.getNotes);
router.post('/get', controller.getFilteredNotes);

export default router;