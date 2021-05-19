import React from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import message from '../../static/css/profile/message.module.css';

// 발신자가 누구인지에 따라 메세지 구조가 달라야 한다.

function Message() {
    return (
        <>
        <div style={{width: '26vw', height: '3vh', background: '#333', borderRadius: '5px', color: '#F2F1ED', fontFamily: 'San Francisco', fontSize: '0.9rem', marginBottom: '1vh', display: 'flex', alignItems: 'center'}}>
            &nbsp;&nbsp;안녕하세요!
        </div>
        <div style={{width: '22vw', height: '3vh', background: '#333', borderRadius: '5px', color: '#F2F1ED', fontFamily: 'San Francisco', fontSize: '0.9rem', marginBottom: '1vh', display: 'flex', alignItems: 'center'}}>
            &nbsp;&nbsp;반가워요!
        </div>
        <div style={{fontSize: '0.3rem'}}>2021.05.19 14:17</div>
        </>
    );
}

export default Message;