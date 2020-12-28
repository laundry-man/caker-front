import React, { useState } from 'react';

import './static/css/body.css';

import PullToRefresh from 'react-simple-pull-to-refresh';
import ViewList from './ViewList';

import Forky from './static/image/forky.jpg';
import BrownHands from './static/image/brownhands.jpg';
import Pic from './static/image/pic.jpg';
import Night from './static/image/night-1846734_1920.jpg';

const DEFAULT_VALUES = {
    isPullable: true,
    canFetchMore: true,
    fetchMoreThreshold: 0,
    pullDownThreshold: 67,
    maxPullDownDistance: 95,
};

function Body() {
    const base: string[] = [Forky, BrownHands, Pic, Night];
    const [path, setPath] = useState(base);

    const [isPullable, setIsPullable] = useState<boolean>(DEFAULT_VALUES.isPullable);
    const [canFetchMore, setCanFetchMore] = useState<boolean>(DEFAULT_VALUES.canFetchMore);
    const [fetchMoreThreshold, setFetchMoreThreshold] = useState<number>(DEFAULT_VALUES.fetchMoreThreshold);
    const [pullDownThreshold, setPullDownThreshold] = useState<number>(DEFAULT_VALUES.pullDownThreshold);
    const [maxPullDownDistance, setMaxPullDownDistance] = useState<number>(DEFAULT_VALUES.maxPullDownDistance);

    const handleReset = (): void => {
        setIsPullable(DEFAULT_VALUES.isPullable);
        setCanFetchMore(DEFAULT_VALUES.canFetchMore);
        setFetchMoreThreshold(DEFAULT_VALUES.fetchMoreThreshold);
        setPullDownThreshold(DEFAULT_VALUES.pullDownThreshold);
        setMaxPullDownDistance(DEFAULT_VALUES.maxPullDownDistance);
    };

    const getNewData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setPath([...path, ...path]));
            }, 3000);
        });
    };

    const resetData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setPath(base));
            }, 3000);
        });
    }

    return (
        <div className="caker-body">
            <div className="caker-body-side"></div>
            <div className="caker-body-center">
                <PullToRefresh
                    onRefresh={resetData}
                    canFetchMore={canFetchMore}
                    isPullable={isPullable}
                    onFetchMore={getNewData}
                    fetchMoreThreshold={fetchMoreThreshold}
                    pullDownThreshold={pullDownThreshold}
                    maxPullDownDistance={maxPullDownDistance}
                    className={"pull-to-refresh"}>
                    <ViewList paths={path}></ViewList>
                </PullToRefresh>
            </div>
            <div className="caker-body-side"></div>
        </div>
    );
}

export default Body;