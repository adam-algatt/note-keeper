import React from 'react'
import Note from './Note';

const NoteList = ({ notes, handleDelete }) => {
  return (
    <div className='note-list'>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            id={index}
            onDelete={handleDelete}
          />
        );
      })}

    </div>
  )
}

export default NoteList