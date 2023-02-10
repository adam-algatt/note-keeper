import { useState, useEffect, useContext, createContext } from "react";

export const NoteContext = createContext();

const NoteProvider = ( {children }) => {
const [notes, setNotes] = useState(['']);
const [selectedNote, setSelectedNote] = useState();

return (
    <NoteContext.Provider 
      value={{
      notes,
      setNotes,
      selectedNote,
      setSelectedNote
      }}
      >
        {children}
      </NoteContext.Provider>
)
}

export const NoteState = () => {
    return useContext(NoteContext);
}

export default NoteProvider;

