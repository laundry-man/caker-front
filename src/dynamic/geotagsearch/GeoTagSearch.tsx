import React, { useState, useEffect } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import GeoTagViewList from './GeoTagViewList';

import { Page, GEO_TAG_SEARCH } from '../../const/Constant';

import Matin1 from '../../static/image/matin_1.png';
import Anthracite1 from '../../static/image/anthracite_1.png';
import BrownHands3 from '../../static/image/brownhands_3.png';
import PotatoField2 from '../../static/image/potatofield_2.png';
import Terarosa1 from '../../static/image/terarosa_1.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import geoTagSearch from '../../static/css/geotagsearch/geoTagSearch.module.css';

type GeoTagSearchProps = {
    pageDidMount: (page: Page) => void,
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
}

function GeoTagSearch({
    pageDidMount,
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

    useEffect(() => {
        pageDidMount(GEO_TAG_SEARCH);
    }, []);

    const [heightState, setHeightState] = useState(false);

    return (
        <div>
            <div className={geoTagSearch.category} 
                style={{height: !heightState ? '3.5vh' : '14vh'}} 
                onClick={() => setHeightState(!heightState)}>
                <div className={geoTagSearch.inner}>
                    데이트하기 좋은
                </div>
            </div>
            <div className={geoTagSearch.container} 
                style={{ height: !heightState ? '81.5vh' : '71vh', transitionDelay: !heightState ? '0.15s' : '0s' }}>
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
            </div>
        </div>
    );
}

export default GeoTagSearch;