// Header.jsx
import React from 'react';

function Header() {
    // Get current date for professional touch
    const currentDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className='header'>
            <div className='header-left'>
                <h1 className='title'>Notebook</h1>
                <p className='header-subtitle'>Capture your thoughts, beautifully</p>
            </div>
            <div className='header-right'>
                <span className='date-badge'>{currentDate}</span>
            </div>
        </div>
    );
}

export default Header;