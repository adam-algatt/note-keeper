
const express = require('express'); 
const router = express.Router();
const { addNote, getAllNotes, getSingleNote, updateEntireNote, deleteNote} = require('../controllers/notes-controller')

router.route('/').post(addNote);
router.route('/updateNote/:noteId').put(updateEntireNote);
router.route('/').get(getAllNotes)
router.route('/:noteId').get(getSingleNote).delete(deleteNote);

module.exports = router;