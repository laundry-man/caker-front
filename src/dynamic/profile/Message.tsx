import React from 'react';

import message from '../../static/css/profile/message.module.css';

type MessageProps = {
    isMine: boolean,
    value: string,
    time: string
}

function Message({ 
    isMine, 
    value, 
    time }: MessageProps) {

    return (
        <div className={message.messageWrapper}>
            <div style={{ width: isMine ? '30vw' : '50vw' }}>
                {isMine ? 
                    <div /> :
                    <div>
                        <div className={message.message} style={{ float: 'left' }}>{value}</div>
                        <div className={message.messageTime} style={{ float: 'left' }}>{time}</div>
                    </div>}
            </div>
            <div style={{ width: isMine ? '50vw' : '30vw' }}>
                {isMine ?
                    <div>
                        <div className={message.message} style={{ float: 'right' }}>{value}</div>
                        <div className={message.messageTime} style={{ float: 'right' }}>{time}</div>
                    </div> : 
                    <div />}
            </div>
        </div>
    );
}

export default Message;