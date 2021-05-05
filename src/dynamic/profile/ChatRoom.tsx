import React from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import chatRoom from '../../static/css/profile/chatRoom.module.css';

import Sent from '../../static/icon/caret-arrow-up.svg';
import Received from '../../static/icon/caret-down.svg';

type ChatRoomProps = {
    roomKey: string,
    enterChatRoom: (key: string) => void
}

function ChatRoom({ roomKey, enterChatRoom }: ChatRoomProps) {
    return (
        <div className={chatRoom.wrapper} onClick={() => enterChatRoom(roomKey)}>
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
                    <img alt="" src={Received} className={index.primaryColor} style={{width: '2vw', marginLeft: '1.5vw'}} />
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