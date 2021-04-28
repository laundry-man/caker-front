import React, { useEffect, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import Detail from './Detail';
import ChatRoomList from './ChatRoomList';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import profile from '../../static/css/profile/profile.module.css';

function Profile() {
    const [isStretch, setIsStretch] = useState(false);
    const [isSettled, setIsSettled] = useState(false);

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
            />
            <div className={profile.searchWrapper} style={{height: isStretch ? '0.3vh' : '3.5vh'}} onTransitionEnd={() => setIsSettled(!isStretch)}>
                <input className={profile.searchPrepend} style={{display: isStretch ? 'none' : isSettled ? 'initial' : 'none'}} readOnly />
                <input className={profile.searchInput} style={{display: isStretch ? 'none' : isSettled ? 'initial' : 'none'}} placeholder="검색" />
                <input className={profile.searchAppend} style={{display: isStretch ? 'none' : isSettled ? 'initial' : 'none'}} />
            </div>
            <div className={profile.separator} />
            <div className={profile.container}
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
                    <ChatRoomList />
                </PullToRefresh>
            </div>
        </div>
    );
}

export default Profile;