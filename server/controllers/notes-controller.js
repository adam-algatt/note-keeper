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
    const { title, content, pinned } = req.body;
    if (!title && !content) return new Error('At least one of the following fields needs to be filled out: title, content');

    Note.create(req.body)
      .then((dbNoteData) => {
        res.json(dbNoteData)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add param for sort type from filter on front end ie pinned, updated at, Title, Content
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

    pinNote (req, res) {
  
      Note.findOneAndUpdate({_id: req.params.noteId},{ $set:{pinned: `${req.body.pinned}`}}, {runValidators: true, new: true})
        .then((dbNoteData) => {
         
          if (!dbNoteData) return res.status(404).json({ message: 'No Note with this id!' });
          console.log(dbNoteData);
          res.json(dbNoteData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err)
        })
     },
  
   updateEntireNote (req, res) {
    console.log(req.body, 'in update entire note')

    Note.findOneAndUpdate({_id: req.params.noteId},{ $set:{title: `${req.body.newTitle}`, content: `${req.body.newContent}`, pinned: `${req.body.newPinned}`}}, {runValidators: true, new: true})
      .then((dbNoteData) => {
       
        if (!dbNoteData) return res.status(404).json({ message: 'No Note with this id!' });
        console.log(dbNoteData);
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