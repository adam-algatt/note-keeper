const Note = require('../models/Note');

const noteController = {

 getSingleNote(req, res) {

   Note.findOne({
       _id: req.params.noteId
     })
     .then((dbNoteData) => {
       if (!dbNoteData) return res.status(404).json({
         message: `No note with id${req.params.noteId}!`
       });
       res.json(dbNoteData);
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 },

  addNote(req, res) {
    const { title, content } = req.body;
    if (!title || !content) return new Error('Title and Content are required');

    Note.create(req.body)
      .then((dbNoteData) => {
        res.json(dbNoteData)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    getAllNotes(req, res) {
      Note.find()
        .sort({
          updatedAt: -1
        })
        .then((dbNoteData) => {
          res.json(dbNoteData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        })
    },

   updateEntireNote (req, res) {
    Note.findOneAndUpdate({_id: req.params.noteId},{ $set:{title: `${req.body.newTitle}`, content: `${req.body.newContent}`}}, {runValidators: true, new: true})
      .then((dbNoteData) => {
       
        if (!dbNoteData) return res.status(404).json({ message: 'No Note with this id!' });
        res.json(dbNoteData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
   },

      deleteNote (req, res) {

        Note.findOneAndRemove({ _id: req.params.noteId })
          .then((dbNoteData) => {
            if(!dbNoteData) return res.status(404).json({ message: `No note found with id: ${req.params.noteId}`})
            res.json({ message: `Note with id: ${req.params.noteId} successfully removed`})
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }

}


module.exports = noteController;