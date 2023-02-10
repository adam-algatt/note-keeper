import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Search from "./components/Search";
import NoteList from "./components/NoteList";
// import { deleteNote, getAllNotes, updateNoteById, getNoteById } from './utils/fetch';
import './styles.css';
import { useNoteContext } from "./hooks/useNoteContext";

// refactor the search/filter function below so that any word within the notes.title can be searched for 
// currently it starts from the front so if you skip a word the notes won't filter correctly

//react context and hooks tutorial

function App() {
  const [notes, setNotes] = useState(['']);
  const [notesSearch, setNotesSearch] = useState('');
  const destroyFunc = useRef();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  // const { notes, setNotes } = useNoteContext(); 
  /*
        Notes for State

    notes will hold all notes returned from 
      useEffect function

    *newState = newNote, setNewNote 
       takes a new note to pass 
*/
const fetchNotes = async() => {
  let count = 1 
  try {

    const response = await fetch('http://localhost:5009/note/', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const json = await response.json();
    // console.log(json);

  setNotes(json)
console.log('notes', notes)
count ++
console.log(count);
  } catch (err) {
     console.log(err)
  }
}
  // set notes state to values stored in LS on first render
  useEffect(() => {
fetchNotes()
return ()=> {
  // if the comp didn't render since the useEffect was called,
  // we know it's the dummy React cycle
  if (!renderAfterCalled.current) { return; }
  if (destroyFunc.current) { destroyFunc.current(); }
}
  }, [])

  //update LS storage everytime notes state is updated
  // useEffect(() => {
  //   localStorage.setItem('notes', JSON.stringify(notes))
  // }, [notes])


  // make sure 'newNote' is being added correctly from notes component
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  // delete note based on componenet ID 
  function deleteNote(id) {
    // setNotes(prevNotes => {
    //   return prevNotes.filter((note, idx) => {
    //     return idx !== id;
    //   })
    }

  
  return (
    <div>
      <Header />


      <CreateArea onAdd={addNote} />
   
       <NoteList
       key={Date.now()}
        notes={notes?.filter(note => {
          if (note.title) {
            return (note.title.toString().toLowerCase().includes(notesSearch))
          } else return ('')
        })}
        handleDelete={deleteNote}

      /> 
      <Search
        searchNote={setNotesSearch}
      />
      <Footer />
    </div>
  );
}

export default App;
