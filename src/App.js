import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import TrashList from "./components/TrashList"; 
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [trashNotes, setTrashNotes] = useState([]);
  const [showTrash, setShowTrash] = useState(false); 

  // Load notes and trash from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("keepNotes"));
    const savedTrash = JSON.parse(localStorage.getItem("trashNotes"));
    if (savedNotes) setNotes(savedNotes);
    if (savedTrash) setTrashNotes(savedTrash);
  }, []);

  // Save to localStorage when notes or trash changes
  useEffect(() => {
    localStorage.setItem("keepNotes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  }, [trashNotes]);

  // Add new note
  const addNote = (data) => {
    const newNote = { id: Date.now(), pinned: false, ...data };
    setNotes([newNote, ...notes]);
  };

  // Update note
  const updateNote = (id, updated) =>
    setNotes(notes.map((note) => (note.id === id ? updated : note)));

  // Delete note → move to trash instead of remove
  const deleteNote = (id) => {
    const noteToTrash = notes.find((note) => note.id === id);
    setNotes(notes.filter((note) => note.id !== id));
    setTrashNotes([noteToTrash, ...trashNotes]);
  };

  // Restore from trash back to notes
  const restoreNote = (id) => {
    const noteToRestore = trashNotes.find((note) => note.id === id);
    setTrashNotes(trashNotes.filter((note) => note.id !== id));
    setNotes([noteToRestore, ...notes]);
  };

  // Delete permanently from trash
  const deleteForever = (id) => {
    setTrashNotes(trashNotes.filter((note) => note.id !== id));
  };

  // Pin/unpin note
  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // Filter based on search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header
        search={search}
        setSearch={setSearch}
        onTrashClick={() => setShowTrash(!showTrash)}
        showTrash={showTrash}
      />


      <main className="app-main">
        {showTrash ? (
          <TrashList
            trashNotes={trashNotes}
            restoreNote={restoreNote}
            deleteForever={deleteForever}
          />
        ) : (
          <>
            <NoteForm addNote={addNote} />
            <NotesList
              notes={filteredNotes}
              updateNote={updateNote}
              deleteNote={deleteNote}
              togglePin={togglePin}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
