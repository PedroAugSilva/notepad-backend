const { Router } = require('express')
const router = Router();
const { createNote, deleteNote, editNote, listNote, listOneNote } = require('../controller/notesController');

router.delete('/note/:id', deleteNote);
router.put('/note/:id', editNote);
router.get('/note/:id', listOneNote)
router.post('/note', createNote);
router.get('/notes/by/:fk_user_id', listNote);


module.exports = router;