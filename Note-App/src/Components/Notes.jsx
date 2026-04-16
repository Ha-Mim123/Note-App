// Notes.jsx
import React, { useEffect, useState } from 'react';
import CreateNote from './CreateNote';
import './notes.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

const Notes = () => {
    // Initialize from localStorage
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("Notes");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [inputText, setInputText] = useState("");
    const [editToggle, setEditToggle] = useState(null);

    const editHandler = (id, text) => {
        setEditToggle(id);
        setInputText(text);
        // Scroll to top for better UX when editing
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const saveHandler = () => {
        if (!inputText.trim()) return;

        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ? { ...note, text: inputText.trim() } : note
            )));
        } else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText.trim()
                }
            ]);
        }

        setInputText("");
        setEditToggle(null);
    };

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
    };

    // Save to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes]);

    const totalNotes = notes.length;

    return (
        <div className='notes-wrapper'>
            <div className='notes-stats'>
                <span className='stats-info'>
                    {totalNotes} {totalNotes === 1 ? 'note' : 'notes'} · 
                    {editToggle !== null ? ' Editing mode' : ' Ready'}
                </span>
            </div>
            <div className='notes'>
                {/* Show edit form if editing */}
                {editToggle !== null && (
                    <CreateNote
                        key="edit-form"
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={saveHandler}
                    />
                )}
                
                {/* Display all notes */}
                {notes.map((note) => (
                    editToggle === note.id ? null : (
                        <Note
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            editHandler={editHandler}
                            deleteHandler={deleteHandler}
                        />
                    )
                ))}
                
                {/* Always show create form (unless editing) */}
                {editToggle === null && (
                    <CreateNote
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={saveHandler}
                    />
                )}
            </div>
        </div>
    );
};

export default Notes;