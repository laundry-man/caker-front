import React from 'react';

import ChatRoom from './ChatRoom';

import chatRoomList from '../../static/css/profile/chatRoomList.module.css';

function ChatRoomList() {
    return (
        <div className={chatRoomList.container}>
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
        </div>
    );
}

export default ChatRoomList;