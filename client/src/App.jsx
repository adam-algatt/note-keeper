import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import Search from "./components/Search";
import NoteList from "./components/NoteList";
import './styles.css';
import { useNoteContext } from "./hooks/useNoteContext";

function App() {
  const [notesSearch, setNotesSearch] = useState('');
  const { notes, setNotes } = useNoteContext(); 

const fetchNotes = async () => {
  try {
    let count = 1
    const response = await fetch('http://localhost:5009/note/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const json = await response.json()

    setNotes(json)
  } catch (err) {
    console.log(err);
  }
  }

  // populates noteContext with all notes from getAllNotes Controller
  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div>
      <Header />
      <CreateArea  fetchAgain={fetchNotes} />
  
       <NoteList
       key='note-list'
       fetchAgain={fetchNotes}
        notes={notes?.filter(note => {
          if (note.title) {
            return (note.title.toString().toLowerCase().includes(notesSearch))
          } else return ('')
        })}
      /> 
 
      <Search searchNote={setNotesSearch} />
      <Footer />
    </div>
  );
}

export default App;
