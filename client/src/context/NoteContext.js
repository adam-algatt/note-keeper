import React, { useState, useEffect, useContext } from "react";

export const NoteContext = createContext();

const NoteProvider = ( {children }) => {
const [notes, setNotes] = useState(['']);
const [selectedNote, setSelectedNote] = useState();

return (
    <NoteContextProvider 
      value={{
      notes,
      setNotes,
      selectedNote,
      setSelectedNote
      }}
      >
        {children}
      </NoteContextProvider>
)
}

export const NoteState = () => {
    return useContext(NoteContext);
}

export default NoteProvider;

