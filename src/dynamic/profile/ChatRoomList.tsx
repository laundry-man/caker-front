import React from 'react';

import ChatRoom from './ChatRoom';

import chatRoomList from '../../static/css/profile/chatRoomList.module.css';

type ChatRoomListProps = {
    enterChatRoom: (key: string) => void
}

function ChatRoomList({ enterChatRoom }: ChatRoomListProps) {
    return (
        <div className={chatRoomList.container}>
            <ChatRoom roomKey={'raingurl'} enterChatRoom={enterChatRoom} />
        </div>
    );
}

export default ChatRoomList;