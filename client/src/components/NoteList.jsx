import React from 'react'
import Note from './Note';
import { useNoteContext } from "../hooks/useNoteContext";

const NoteList = ({ fetchAgain }) => {
const { notes } = useNoteContext(); 
  return (
    <div className='note-list'>
      {notes && notes.map((noteItem, idx) => (
         
          <Note
            key={`${noteItem._id}${idx}`}
            title={noteItem.title}
            content={noteItem.content}
            id={noteItem._id}
            fetchAgain={fetchAgain}
          />
        
      ))}

    </div>
  )
}

export default NoteList