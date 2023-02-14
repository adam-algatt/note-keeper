import React, { useState } from "react";
import delIcon from '../images/delete.png';
import editIcon from '../images/edit.png'
import submitIcon from '../images/submit-doc.png'
import { useNoteContext } from "../hooks/useNoteContext";

const Note = ({ content, title, id, fetchAgain }) => {
  const { notes, setNotes } = useNoteContext();
  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState({title: "", content: "",});

  const handleEditClick = async () => {
    let json
    try {
      let count = 1
      const response = await fetch(`http://localhost:5009/note/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      json = await response.json()

      setEditNote(true) // makes selected note editable
    } catch (err) {
      console.log(err);
    }
    setNote(json) // sets client side state for editing and PUT req body
  }

  function handleChange(event) { // client side editing state for PUT req
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const deleteSelectedNote = async() => {
    try {
     const response = await fetch(`http://localhost:5009/note/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (notes.length <= 1) {
        setNotes([''])
        fetchAgain()
        return
      }
      const json = await response.json()
  
        setNotes(prev => {
          prev.filter(note => (
           note !== json
          ))
        })
        fetchAgain() // function in App component calls getAllNotes from notesControllers
    } 
    catch(err) {
        console.log(err);
      }
    }

    const editSelectedNote = async (e) => { // when .update-btn is clicked put req is send for individual note
      e.preventDefault();

      try {
        const body = {
          "newTitle": `${note.title}`,
          "newContent": `${note.content}`
        }

        const response = await fetch(`http://localhost:5009/note/updatenote/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const json = await response.json()
      } catch (err) {
        console.log(err);
      }
      setEditNote(false)
      fetchAgain(); // function in App component calls getAllNotes from notesControllers
    }
  
    return (
     <>
      {!editNote  ?  ( // if edit note is true sets note title and content to input and text area for edits
        <div className="note" id={id} >
          <h1>{title}</h1>
          <p>{content}</p>
          <button className='del-icon' id={id} onClick={deleteSelectedNote}><img src={delIcon} /></button>
          <button className='edit-icon' id={id} onClick={handleEditClick} ><img src={editIcon} /></button>
        </div>
    ) :  (
        <form className="edit-note">
          <input
            name="title"
            className="edit-title-input"
            onChange={handleChange}
            value={note.title}
            placeholder={note.title}
          />
          <textarea
            name="content"
            className="edit-content-input"
            onChange={handleChange}
            value={note.content}
            placeholder={note.content}
          />
        <button className='update-btn' id={id} onClick={editSelectedNote}><img src={submitIcon} alt='submit icon'/></button>
        </form>
      )}
      </>
    )
    }

export default Note;
