import React from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import message from '../../static/css/profile/message.module.css';

// 발신자가 누구인지에 따라 메세지 구조가 달라야 한다.

type MessageProps = {
    isMine: boolean,
    value: string
}

function Message({ isMine, value }: MessageProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: isMine ? '30vw' : '50vw' }}>
                {isMine ? 
                    <div /> :
                    <div>
                        <div className={message.message} style={{ float: 'left' }}>{value}</div>
                        <div className={message.messageTime} style={{ float: 'left' }}>2021.05.19 18:32</div>
                    </div>}
            </div>
            <div style={{ width: isMine ? '50vw' : '30vw' }}>
                {isMine ?
                    <div>
                        <div className={message.message} style={{ float: 'right' }}>{value}</div>
                        <div className={message.messageTime} style={{ float: 'right' }}>2021.05.19 18:32</div>
                    </div> : 
                    <div />}
            </div>
        </div>
    );
}

export default Message;