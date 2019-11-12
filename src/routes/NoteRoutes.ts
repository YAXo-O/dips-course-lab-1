import controller from '@controller/NoteController';
import {Router} from 'express';
const router = Router();

router.post('/create', controller.createNote);
router.get('/get', controller.getNotes);
router.post('/get', controller.getFilteredNotes);

export default router;
