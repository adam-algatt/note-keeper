import React, { useState, useEffect } from "react";
import { useNoteContext } from "../hooks/useNoteContext"

function CreateArea({ fetchAgain }) {
  const { notes, setNotes } = useNoteContext(); 
  const [note, setNote] = useState({title: "", content: "",});


  const createNote = async (e) => {
    e.preventDefault();
    let params = JSON.stringify(note)
    
    try {
      let count = 1
      const response = await fetch(`http://localhost:5009/note/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: params
      })

      const json = await response.json()

      setNotes(prev => ([...prev, json]))
      setNote({
        title: "",
        content: "",
      })

      fetchAgain() // function in App component calls getAllNotes from notesControllers
    } catch (err) {
      console.log(err);
    }
  }

  // sets whether or not the notes create area is expanded or not
  const [clicked, setClicked] = useState(false);

  function noteClicked() {
    if (clicked === false) {
      setClicked((prevValue) => {
        return !prevValue;
      });
    } else {
      return null;
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          style={clicked ? { display: "" } : { display: "none" }}
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          onClick={noteClicked}
          placeholder="Take a note..."
          rows={clicked ? 3 : 1}
        />
        <button onClick={createNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
