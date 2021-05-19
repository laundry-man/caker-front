import React, { useState, useEffect } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import chatView from '../../static/css/profile/chatView.module.css';

import LeftPointer from '../../static/icon/chevron-pointing-to-the-left.svg';
import MessageList from './MessageList';

import SendIcon from '../../static/icon/arrowhead-pointing-up-inside-a-square-box-outline.svg';

type ChatViewProps = {

};

function ChatView() {

    const [isStretch, setIsStretch] = useState(false);

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

    return (
        <div>
            <div style={{width: '80vw', height: '3.5vh', marginBottom: '1vh', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <img alt="" src={LeftPointer} className={index.primaryCOlor} style={{width: '2.5vw', marginRight: '2vw'}}/>
                <div style={{fontFamily: 'San Francisco', fontSize:'1rem', fontWeight:'bold', paddingBottom: '0.2vh'}}>raingurl</div>
            </div>
            <div className={chatView.container} style={{height: '73.5vh'}}>
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
            <div className={chatView.inputWrapper}>
                <div style={{width: '6vw', height: '3.5vh'}} />
                <input style={{width: '66vw', height: '3vh', background: 'transparent', border: 'none', outline: 'none', boxShadow: 'none', caretColor: '#333', fontSize: '0.8rem'}} />
                <div style={{width: '8vw', height: '3.5vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img alt="" src={SendIcon} style={{width: '1rem', filter: 'invert(88%) sepia(0%) saturate(34%) hue-rotate(244deg) brightness(99%) contrast(105%)'}}/>
                </div>
            </div>
        </div>
    );
}

export default ChatView;