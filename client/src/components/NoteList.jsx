import React from 'react'
import Note from './Note';
import { useNoteContext } from "../hooks/useNoteContext";

const NoteList = ({ fetchAgain, searchnotes, setSearch }) => {
const { notes, setNotes, searchNotes, setSearchNotes } = useNoteContext(); 
// searchNotes.length > 1 ? notesArr = searchNotes : notesArr = notes; 
  return (
    <div className='note-list'>
      
        {searchnotes?.map((noteItem, idx) => (
          <Note
            key={noteItem.key}
            title={noteItem.title}
            content={noteItem.content}
            id={noteItem._id}
            fetchAgain={fetchAgain}
            setSearch={setSearch}
          />
      ))
      }

    </div>
  )
}

export default NoteList