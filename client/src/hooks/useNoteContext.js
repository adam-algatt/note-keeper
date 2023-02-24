import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

export const useNoteContext = () => { // hook passed to child components that need to use notes context
  const context = useContext(NoteContext)
  
  return context
}