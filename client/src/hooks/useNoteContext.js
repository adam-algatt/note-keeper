import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

export const useNoteContext = () => {
  const context = useContext(NoteContext)
  
  return context
}