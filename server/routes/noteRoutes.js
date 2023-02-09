
const express = require('express'); 
const router = express.Router();
const { addNote, getAllNotes, getSingleNote, updateNoteTitle, updateNoteContent, updateEntireNote, deleteNote} = require('../controllers/notes-controller')

router.route('/').post(addNote);
router.route('/updateTitle/:noteId').put(updateNoteTitle);
router.route('/updateContent/:noteId').put(updateNoteContent);
router.route('/updateNote/:noteId').put(updateEntireNote);
router.route('/').get(getAllNotes)
// /note/:id
router.route('/:noteId').get(getSingleNote).delete(deleteNote);

module.exports = router;