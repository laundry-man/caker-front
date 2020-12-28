import React, { useState } from 'react';

import './static/css/body.css';

import PullToRefresh from 'react-simple-pull-to-refresh';
import ViewList from './ViewList';

import Forky from './static/image/forky.jpg';
import BrownHands from './static/image/brownhands.jpg';
import Pic from './static/image/pic.jpg';
import Night from './static/image/night-1846734_1920.jpg';

function Body() {
    const base: string[][] = [[Forky, BrownHands, Pic, Night], [Forky, BrownHands, Pic, Night]];
    const [path, setPath] = useState(base);

    const [isPullable, setIsPullable] = useState<boolean>(true);
    const [canFetchMore, setCanFetchMore] = useState<boolean>(true);
    const [fetchMoreThreshold, setFetchMoreThreshold] = useState<number>(0);
    const [pullDownThreshold, setPullDownThreshold] = useState<number>(67);
    const [maxPullDownDistance, setMaxPullDownDistance] = useState<number>(95);

    const handleReset = (): void => {
        setIsPullable(true);
        setCanFetchMore(true);
        setFetchMoreThreshold(0);
        setPullDownThreshold(67);
        setMaxPullDownDistance(95);
    };

    const getNewData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setPath([...path, ...path]));
            }, 1000);
        });
    };

    const resetData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setPath(base));
            }, 1000);
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