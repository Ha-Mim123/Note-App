// Note.jsx
import React from 'react';

const Note = ({ id, text, editHandler, deleteHandler }) => {
    // Truncate long text for preview if needed (optional)
    const displayText = text.length > 200 ? text.substring(0, 200) + '...' : text;
    
    return (
        <div className='note'>
            <div className='note-header'>
                <span className='note-icon'>📄</span>
            </div>
            <div className='note-body'>{displayText}</div>
            <div className='note_footer'>
                <button className='note_delete' onClick={() => deleteHandler(id)}>
                    Delete
                </button>
                <button className='note_edit' onClick={() => editHandler(id, text)}>
                    Edit
                </button>
            </div>
        </div>
    );
};

export default Note;