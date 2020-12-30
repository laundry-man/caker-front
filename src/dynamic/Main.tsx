import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PullToRefresh from 'react-simple-pull-to-refresh';

import ViewList from './ViewList';

import Forky from '../static/image/forky.jpg';
import BrownHands from '../static/image/brownhands.jpg';
import Pic from '../static/image/pic.jpg';
import Night from '../static/image/night-1846734_1920.jpg';

import Maps from '../static/icon/map-marker.svg';
import Notes from '../static/icon/plus-black-symbol.svg';
import Cogs from '../static/icon/cog-wheel-silhouette.svg';
import Books from '../static/icon/reorder-option.svg';

function Main() {
    const base: string[][] = [[Forky, Forky, Forky, Forky], [BrownHands, Pic, Night, Forky]];
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
        <div className="app fade-in-app">
            <div className="caker-header">
                <div className="caker-header-side"></div>
                <div className="caker-header-center">
                    <div className="caker-header-wrapper">
                        <div className="caker-header-title">
                            <span>CAKER</span>
                        </div>
                        <div className="caker-header-content">
                            <span>2000m</span>
                        </div>
                    </div>
                    <div className="caker-header-bar">&nbsp;</div>
                </div>
                <div className="caker-header-side"></div>
            </div>
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
            <div className="caker-footer">
                <div className="caker-footer-side"></div>
                <div className="caker-footer-center">
                    <div className="caker-footer-bar">&nbsp;</div>
                    <div className="caker-footer-wrapper">
                        <Link to="/search" className="caker-footer-button-wrapper">
                            <img alt="" src={Maps} className="icon-color caker-footer-button"></img>
                        </Link>
                        <Link to="/upload" className="caker-footer-button-wrapper">
                            <img alt="" src={Notes} className="icon-color caker-footer-button"></img>
                        </Link>
                        <Link to="/list" className="caker-footer-button-wrapper">
                            <img alt="" src={Books} className="icon-color caker-footer-button"></img>
                        </Link>
                        <Link to="/settings" className="caker-footer-button-wrapper">
                            <img alt="" src={Cogs} className="icon-color caker-footer-button"></img>
                        </Link>
                    </div>
                </div>
                <div className="caker-footer-side"></div>
            </div>
        </div>
    );
}

export default Main;