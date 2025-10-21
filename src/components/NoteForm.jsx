import React, { useState } from "react";
import "./NoteForm.css";
function NoteForm({ addNote }) {
  // State to track if form is expanded
  const [isExpanded, setIsExpanded] = useState(false);
  // State for note title and content
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Only add note if there's content
    if (title.trim() || content.trim()) {
      addNote({ title, content });
      // Clear form after submission
      setTitle("");
      setContent("");
      setIsExpanded(false);
    }
  };
  // Expand form when clicking on it
  const handleExpand = () => {
    setIsExpanded(true);
  };
  // Close form when clicking outside
  const handleClose = () => {
    if (!title.trim() && !content.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="note-form-container">
      <form className="note-form" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-form-input"
            autoFocus
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={handleExpand}
          className="note-form-textarea"
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <div className="note-form-actions">
            <button type="submit" className="note-form-button">
              Add Note
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="note-form-button note-form-button-secondary"
            >
              Close
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
export default NoteForm;
