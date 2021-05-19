import React, { useState, useEffect } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import chatView from '../../static/css/profile/chatView.module.css';

import LeftPointer from '../../static/icon/chevron-pointing-to-the-left.svg';
import MessageList from './MessageList';

import SendIcon from '../../static/icon/arrowhead-pointing-up-inside-a-square-box-outline.svg';
import { EMPTY_STRING, ENTER_KEY } from '../../const/Constant';

function ChatView() {
    const [toggle, setToggle] = useState(false);
    const [isWritten, setIsWritten] = useState(false);
    const [input, setInput] = useState(EMPTY_STRING);

    function getNewData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        });
    };

    function resetData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        });
    }

    function change(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === EMPTY_STRING) {
            setInput(EMPTY_STRING);
            setIsWritten(false);
        }
        else {
            if (!isWritten)
                setIsWritten(true);
            setInput(e.target.value);
        }
    }

    function submit(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === ENTER_KEY && input !== EMPTY_STRING) {

        }
    }

    return (
        <div>
            <div style={{ width: '80vw', height: '3.5vh', marginBottom: '1vh', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img alt="" src={LeftPointer} className={index.primaryCOlor} style={{ width: '2.5vw', marginRight: '2vw' }} />
                <div style={{ fontFamily: 'San Francisco', fontSize: '1rem', fontWeight: 'bold', paddingBottom: '0.2vh' }}>raingurl</div>
            </div>
            <div className={chatView.container} style={{ height: '73.5vh' }}>
                <PullToRefresh
                    onRefresh={resetData}
                    canFetchMore={true}
                    isPullable={true}
                    onFetchMore={getNewData}
                    fetchMoreThreshold={0}
                    pullDownThreshold={67}
                    maxPullDownDistance={95}
                    className={classNames([index.pullToRefresh, index.fadeInFast])}>
                    <MessageList />
                </PullToRefresh>
            </div>
            <div className={chatView.inputWrapper} style={{ border: toggle ? '0.3vh solid #333333' : '0.3vh solid #E3E2DE' }}>
                <div className={chatView.prepend} />
                <input 
                    type="text"
                    placeholder="메세지"
                    value={input}
                    className={toggle ? chatView.input2 : chatView.input1}
                    onChange={(e) => change(e)} 
                    onKeyUp={(e) => submit(e)}
                    onFocus={() => setToggle(true)}
                    onBlur={() => setToggle(isWritten)} />
                <div className={chatView.append}>
                    <img className={toggle ? chatView.focusColor : chatView.blurColor} alt="" src={SendIcon} style={{ width: '1rem' }} />
                </div>
            </div>
        </div>
    );
}

export default ChatView;