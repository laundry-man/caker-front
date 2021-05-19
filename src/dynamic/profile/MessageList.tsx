import React from 'react';
import Message from './Message';

import Matin1 from '../../static/image/matin_1.png';

import messageList from '../../static/css/profile/messageList.module.css';

function MessageList() {
    return (
        <div>
            <Profile />
            <Message />
        </div>
    );
}

function Profile() {
    return (
        <div className={messageList.detailWrapper} style={{ height: '14vh' }}>
            <div className={messageList.detail}>
                <div className={messageList.nameWrapper}>
                    <div className={messageList.name}>
                        raingurl
                    </div>
                </div>
                <div>
                    <div className={messageList.content}>
                        cake rating : <b>3220</b>
                    </div>
                    <div className={messageList.content}>
                        ranking : <b>1032</b>
                    </div>
                    <div className={messageList.content}>
                        tier : <b>strawberry</b>
                    </div>
                </div>
            </div>
            <div style={{width: '8vh'}}>
                <div style={{height: '3.5vh'}} />
                <div style={{width: '8vh', height: '8vh', background: '#333', borderRadius: '5px', backgroundImage: 'url(' + Matin1 + ')', backgroundSize: 'cover'}}/>
            </div>
            <div className={messageList.append}>
                <div className={messageList.dot}>●</div>
            </div>
        </div>
    )
}


export default MessageList;