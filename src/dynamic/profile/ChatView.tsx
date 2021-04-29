import React, { useState, useEffect } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import chatView from '../../static/css/profile/chatView.module.css';

import LeftPointer from '../../static/icon/chevron-pointing-to-the-left.svg';
import MessageList from './MessageList';

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
            <div style={{width: '80vw', height: '3.5vh', background: '#E3E2DE', borderRadius: '5px'}} />
        </div>
    );
}

export default ChatView;