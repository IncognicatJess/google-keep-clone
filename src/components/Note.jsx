import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ColorPalette from "./ColorPalette";
import "./Note.css";

function Note({ note, updateNote, deleteNote, togglePin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editColor, setEditColor] = useState(note.color || "#FFFFFF");

  // Keep local edit state in sync if the note prop changes
  useEffect(() => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color || "#FFFFFF");
  }, [note.title, note.content, note.color]);

  // Save edited note
  const handleSave = () => {
    updateNote(note.id, {
      ...note,
      title: editTitle,
      content: editContent,
      color: editColor,
    });
    setIsEditing(false);
  };

  // Cancel editing and restore original values
  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color || "#FFFFFF");
    setIsEditing(false);
  };

  // Delete note with confirmation
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
    }
  };

  // untuk menangani pemilihan warna
  const handleColorSelect = (color) => {
    setEditColor(color); // Update state lokal 'editColor'
  };

  return (
    <div className="note"
      style={{backgroundColor: isEditing ? editColor : note.color}}
      >
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            name="title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-input"
            autoFocus
          />
          <textarea
            name="content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="note-edit-textarea"
            rows={4}
          />

          <ColorPalette onSelectColor={handleColorSelect} />

          <div className="note-edit-actions">
            <button
              type="button"
              onClick={handleSave}
              className="note-button note-button-save"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="note-button note-button-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="note-view" onClick={() => setIsEditing(true)}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>
          <div className="note-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePin(note.id);
              }}
              className="note-pin"
              title={note.pinned ? "Unpin note" : "Pin note"}
            >
              {note.pinned ? "📍" : "📌"}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="note-delete"
              title="Delete note"
              aria-label="Delete note"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <title>Delete</title>
                <path
                  fill="currentColor"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default Note;
