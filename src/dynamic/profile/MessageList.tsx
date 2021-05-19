import React from 'react';
import Message from './Message';

import Matin1 from '../../static/image/matin_1.png';

import messageList from '../../static/css/profile/messageList.module.css';

function MessageList() {
    return (
        <div>
            <Profile />
            <Message 
                isMine={false} 
                value={'이 카페 자주 오시나봐요 :)'}
            />
            <Message 
                isMine={true} 
                value={'안녕하세요! 맞아요 자주 오는 카페에요 :)'}
            />
            <Message 
                isMine={true} 
                value={'저희 뵌 적이 있을까요?'}
            />
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
            <div className={messageList.imageWrapper}>
                <img alt="" src={Matin1} className={messageList.image}/>
            </div>
            <div className={messageList.append}>
                <div className={messageList.dot}>●</div>
            </div>
        </div>
    )
}


export default MessageList;