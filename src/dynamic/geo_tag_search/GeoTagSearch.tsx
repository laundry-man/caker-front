import React, { useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import { MainProps } from '../../const/Type';
import TagViewList from './TagViewList';

import Matin1 from '../../static/image/matin_1.png';
import Anthracite1 from '../../static/image/anthracite_1.png';
import BrownHands3 from '../../static/image/brownhands_3.png';
import PotatoField2 from '../../static/image/potatofield_2.png';
import Terarosa1 from '../../static/image/terarosa_1.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';

function GeoTagSearch({ redirect, setContent, setPredecessor }: MainProps) {
    const [pathList, setPathList] = useState([Matin1, Anthracite1, BrownHands3, PotatoField2, Terarosa1]);

    const getNewData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    const resetData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    return (
        <PullToRefresh
            onRefresh={resetData}
            canFetchMore={true}
            isPullable={true}
            onFetchMore={getNewData}
            fetchMoreThreshold={0}
            pullDownThreshold={67}
            maxPullDownDistance={95}
            className={classNames([index.pullToRefresh, index.fadeInFast])}>
            <TagViewList pathList={pathList}
                         redirect={redirect}
                         setContent={setContent}
                         setPredecessor={setPredecessor}></TagViewList>
        </PullToRefresh>
    );
}

export default GeoTagSearch;