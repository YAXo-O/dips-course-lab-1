import Controller from '@controller/NoteController';
import {Router} from 'express';

const router = Router();

router.post('/create', Controller.createNote);
router.get('/get', Controller.getNotes);
router.post('/get', Controller.getFilteredNotes);

export default router;
