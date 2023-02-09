import React, { useState, useEffect } from "react";

import { useLocalStorage } from '../useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { sortAndDeduplicateDiagnostics } from "typescript";

function CreateArea(props) {

  const generateKey = () => uuidv4()

  const [note, setNote] = useState({
    title: "",
    content: "",
    key: generateKey()
  });

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

  function addUniqueKey() { return uuidv4() }

  function submitNote(event) {
    let name = event.target.name;

    console.log(note);

    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      key: generateKey()
    });
    event.preventDefault();
    setClicked(false);
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
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}


export default CreateArea;
