import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Search from "./components/Search";
import NoteList from "./components/NoteList";
import { deleteNote, getAllNotes, updateNoteById, getNoteById } from './utils/fetch';
import './styles.css';
import { useNoteContext } from "./hooks/useNoteContext";
import { getAllJSDocTagsOfKind } from "typescript";

// refactor the search/filter function below so that any word within the notes.title can be searched for 
// currently it starts from the front so if you skip a word the notes won't filter correctly

//react context and hooks tutorial

function App() {
  // const [notes, setNotes] = useState(['']);
  const [notesSearch, setNotesSearch] = useState('');
  const { notes, setNotes } = useNoteContext(); 

  /*
        Notes for State

    notes will hold all notes returned from 
      useEffect function

    *newState = newNote, setNewNote 
       takes a new note to pass 
*/

  // set notes state to values stored in LS on first render
  useEffect(async() => {
   const json = await getAllNotes()
   setNotes(json)
   console.log(notes);
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
      {/* {notes.filter((noteItem, index) => {
        return (
          <Note
            key={noteItem.key}
            title={noteItem.title}
            content={noteItem.content}
            id={index}
            onDelete={deleteNote}
          />
        );
      })} */}
      <NoteList
        // notes={notes.filter((note) => {
        //   if (note.title) {
        //     return (note.title.toString().toLowerCase().includes(notesSearch))
        //   } else return ('')
        // })}
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
