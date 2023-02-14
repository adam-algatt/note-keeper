import { useState, useContext, createContext } from "react";

export const NoteContext = createContext();

const NoteProvider = ( { children }) => { // global state to hold all notes from backend
const [notes, setNotes] = useState([]);

return (
    <NoteContext.Provider 
      value={{
      notes,
      setNotes,
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

