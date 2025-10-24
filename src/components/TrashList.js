import React from 'react';
import "./TrashList.css";

function TrashList({ trashNotes, restoreNote, deleteForever }) {
  if (trashNotes.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Trash is empty</p>;
  }

  return (
    <div className="notes-grid">
      {trashNotes.map(note => (
        <div
          key={note.id}
          className="note"
          style={{ backgroundColor: note.color || '#fff' }} 
        >
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>

          <div className="trash-actions">
            <button className="btn-restore" onClick={() => restoreNote(note.id)}>Restore</button>
            <button className="btn-delete" onClick={() => deleteForever(note.id)}>Delete Forever</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrashList;
