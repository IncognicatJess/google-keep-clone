import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState(""); 

  // Load data dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("keepNotes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Simpan data ke localStorage
  useEffect(() => {
    localStorage.setItem("keepNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (data) => {
    const newNote = { id: Date.now(), ...data };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updated) =>
    setNotes(notes.map((note) => (note.id === id ? updated : note)));

  const deleteNote = (id) =>
    setNotes(notes.filter((note) => note.id !== id));

  // 🟨 Bagian INI yang dimaksud "Filter Daftar Catatan Sebelum Ditampilkan"
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header />

      {/* Kolom Pencarian */}
      <input
        type="text"
        placeholder="Cari catatan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "10px", padding: "8px", width: "90%" }}
      />

      <main className="app-main">
        <NoteForm addNote={addNote} />

        {/* Ganti notes jadi filteredNotes */}
        <NotesList
          notes={filteredNotes}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </main>
    </div>
  );
}

export default App;
