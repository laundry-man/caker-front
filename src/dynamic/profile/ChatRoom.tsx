import React from 'react';

import chatRoom from '../../static/css/profile/chatRoom.module.css';

function ChatRoom() {
    return (
        <div className={chatRoom.wrapper}>
            <div className={chatRoom.prepend}>
                <div className={chatRoom.dot}>
                    ●
                </div>
            </div>
            <div className={chatRoom.append}>
                <div className={chatRoom.nameMessageWrapper}>
                    <div className={chatRoom.name}>
                        raingurl
                    </div>
                </div>
                <div className={chatRoom.nameMessageWrapper}>
                    <div className={chatRoom.message}>
                        이 카페 자주오시나봐요!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;