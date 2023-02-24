const { Schema, model} = require('mongoose')
const noteSchema = new Schema(
    {
       title: {
        type: String,
        required: 'Note title required', 
        minlength: 1,
        maxlength: 100 
       },
       content: {
        type: String,
        required: true, 
       },
    },
    {timestamps: true},
 );


const Note = model('Note', noteSchema);
module.exports = Note;