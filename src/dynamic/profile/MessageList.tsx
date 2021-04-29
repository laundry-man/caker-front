import React from 'react';
import ChatMessage from './Message';

function MessageList() {
    return (
        <div>
            <Profile />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
        </div>
    );
}

function Profile() {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80vw', height: '20vw'}}>raingurl</div>
    )
}


export default MessageList;