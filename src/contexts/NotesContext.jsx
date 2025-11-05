import { createContext, useContext, useState, useEffect } from "react";

export const NotesContext = createContext({});

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const saveToLocal = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const addNote = (title, content) => {
    const newNote = { id: Date.now(), title, content };
    const updatedNotes = [newNote, ...notes]; // newest first
    saveToLocal(updatedNotes);
  };

  const updateNote = (id, title, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, content } : note
    );
    saveToLocal(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveToLocal(updatedNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
