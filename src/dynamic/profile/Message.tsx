import React from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import message from '../../static/css/profile/message.module.css';

// 발신자가 누구인지에 따라 메세지 구조가 달라야 한다.

function Message() {
    return (
        <div style={{width: '80vw', height: '3vh', background: '#333', borderRadius: '5px', marginBottom: '1vh'}} />
    );
}

export default Message;