const { Schema, model} = require('mongoose')
const noteSchema = new Schema(
    {
       title: {
        type: String,
        minlength: 1,
        maxlength: 100 
       },
       content: {
        type: String,
       },
       pinned: {
         type: Boolean,
         default: false, 
       }
    },
    {timestamps: true},
 );


const Note = model('Note', noteSchema);
module.exports = Note;