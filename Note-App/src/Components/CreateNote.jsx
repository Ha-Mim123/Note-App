// CreateNote.jsx
import React, { useEffect, useRef } from 'react';

const CreateNote = ({ inputText, setInputText, saveHandler }) => {
    
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const charLimit = 100;
    const charRemaining = charLimit - inputText.length;

    return (
        <div className='note note-create'>
            <textarea
                ref={inputRef}
                cols={10}
                rows={5}
                placeholder="Write something brilliant..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={charLimit}
            />
            <div className='note_footer'>
                <span className={`char-counter ${charRemaining < 20 ? 'char-warning' : ''}`}>
                    {charRemaining} characters left
                </span>
                <button 
                    className='note_save' 
                    onClick={saveHandler}
                    disabled={!inputText.trim()} 
                >
                    {!inputText.trim() ? '✖ Save' : '✓ Save Note'}
                </button>
            </div>
        </div>
    );
};

export default CreateNote;