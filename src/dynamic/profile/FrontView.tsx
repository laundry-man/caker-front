import React, { useState } from 'react';

import { Page } from '../../const/Constant';

import PullToRefresh from 'react-simple-pull-to-refresh';

import Detail from './Detail';
import ChatRoomList from './ChatRoomList';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import frontView from '../../static/css/profile/frontView.module.css';

type FrontViewProps = {
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>,
    enterChatRoom: (key: string) => void
};

function FrontView({
    redirect,
    setContent,
    setPredecessor,
    enterChatRoom}: FrontViewProps) {

    const [isStretch, setIsStretch] = useState(false);
    const [isSettled, setIsSettled] = useState(true);

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
        <div className={index.fadeInFast}>
            <Detail 
                isStretch={isStretch}
                setIsStretch={setIsStretch}
                redirect={redirect}
                setContent={setContent}
                setPredecessor={setPredecessor}
            />
            <div className={frontView.searchWrapper} style={{height: isStretch ? '0.3vh' : '3.5vh'}} onTransitionEnd={() => setIsSettled(!isStretch)}>
                <input className={frontView.searchPrepend} style={{display: isStretch ? 'none' : isSettled ? 'initial' : 'none'}} readOnly />
                <input className={frontView.searchInput} style={{display: isStretch ? 'none' : isSettled ? 'initial' : 'none'}} placeholder="검색" />
                <input className={frontView.searchAppend} style={{display: isStretch ? 'none' : isSettled ? 'initial' : 'none'}} readOnly />
            </div>
            <div className={frontView.separator} />
            <div className={frontView.container}
                style={{ height: !isStretch ? '71vh' : '63.7vh' }}>
                <PullToRefresh
                    onRefresh={resetData}
                    canFetchMore={true}
                    isPullable={true}
                    onFetchMore={getNewData}
                    fetchMoreThreshold={0}
                    pullDownThreshold={67}
                    maxPullDownDistance={95}
                    className={classNames([index.pullToRefresh, index.fadeInFast])}>
                    <ChatRoomList enterChatRoom={enterChatRoom} />
                </PullToRefresh>
            </div>
        </div>
    )
}

export default FrontView;