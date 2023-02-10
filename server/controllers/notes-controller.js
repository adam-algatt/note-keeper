const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');


const noteController = {

 getSingleNote(req, res) {
  console.log('getSingleNote')
  console.log(req.params.noteId)
  Note.findOne({ _id: req.params.noteId })
    .then((dbNoteData) => {
      if(!dbNoteData) return res.status(404).json({ message: `No note with id${req.params.noteId}!` });
      res.json(dbNoteData); 
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
 },

  addNote(req, res) {
    console.log('add note called');
    const {
      title,
      content,
    } = req.body;
    if (!title || !content) return

    Note.create(req.body)
      .then((dbNoteData) => {
        res.json(dbNoteData)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    getAllNotes (req, res) {
      console.log('getAllNotes called')
       Note.find()
         .sort({ updatedAt: -1 })
         .then((dbNoteData) => {
          res.json(dbNoteData);
          console.log(dbNoteData);
         })
         .catch((err) => {
          console.log(err);
          res.status(500).json(err);
         })

   },

   updateEntireNote (req, res) {
    console.log(req.body)
    Note.findOneAndUpdate({_id: req.params.noteId},{ $set:{title: `${req.body.newTitle}`, content: `${req.body.newContent}`}}, {runValidators: true, new: true})
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

   updateNoteContent (req, res) {
    console.log(req.body)
    Note.findOneAndUpdate({_id: req.params.noteId},{ $set:{content: `${req.body.newContent}`}}, {runValidators: true, new: true})
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
   updateNoteTitle (req, res) {
    console.log(req.body)
    Note.findOneAndUpdate({_id: req.params.noteId},{ $set:{title: `${req.body.newTitle}`}}, {runValidators: true, new: true})
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



  //   sortNotes = asyncHandler(async(req, res) => {
  //   const { sortMethod } = req.body;
  //   //takes fetch with body indicating sort method
  //   // conditional for all sorting options 
  //     // e.g alphabetical, numerical, date created, etc.

  //     const alphabetical = await Note.find({    })

  //     //returns res.status(200).send.json(res)

  // })

}


module.exports = noteController;