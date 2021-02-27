import React, { useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import GeoTagViewList from './GeoTagViewList';

import { Page } from '../../const/Constant';

import Matin1 from '../../static/image/matin_1.png';
import Anthracite1 from '../../static/image/anthracite_1.png';
import BrownHands3 from '../../static/image/brownhands_3.png';
import PotatoField2 from '../../static/image/potatofield_2.png';
import Terarosa1 from '../../static/image/terarosa_1.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';

type GeoTagSearchProps = {
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
}

function GeoTagSearch({ 
    redirect, 
    setContent, 
    setPredecessor }: GeoTagSearchProps) {

    const [pathList, setPathList] = useState([Matin1, Anthracite1, BrownHands3, PotatoField2, Terarosa1]);

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
        <PullToRefresh
            onRefresh={resetData}
            canFetchMore={true}
            isPullable={true}
            onFetchMore={getNewData}
            fetchMoreThreshold={0}
            pullDownThreshold={67}
            maxPullDownDistance={95}
            className={classNames([index.pullToRefresh, index.fadeInFast])}>
            <GeoTagViewList 
                pathList={pathList}
                redirect={redirect}
                setContent={setContent}
                setPredecessor={setPredecessor}
            />
        </PullToRefresh>
    );
}

export default GeoTagSearch;