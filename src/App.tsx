import React, { useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

import './static/css/App.css';
import './static/css/header.css';
import './static/css/body.css';
import './static/css/footer.css';

import Forky from './static/image/forky.jpg';
import BrownHands from './static/image/brownhands.jpg';
import Pic from './static/image/pic.jpg';
import Night from './static/image/night-1846734_1920.jpg';

import Maps from './static/icon/map-marker.svg';
import Notes from './static/icon/plus-black-symbol.svg';
import Settings from './static/icon/cog-wheel-silhouette.svg';
import Books from './static/icon/reorder-option.svg';

const DEFAULT_VALUES = {
  isPullable: true,
  canFetchMore: true,
  fetchMoreThreshold: 0,
  pullDownThreshold: 67,
  maxPullDownDistance: 95,
};

const App: React.FC = () => {
  // prettier-ignore
  const FAKE_LIST = ['baz', 'foo', 'bar', 'baz', 'foo', 'baz', 'foo', 'bar', 'baz', 'foo', 'baz', 'foo', 'bar', 'baz', 'foo', 'baz', 'foo', 'bar', 'baz', 'foo', 'baz', 'foo', 'bar', 'baz', 'foo', 'baz', 'foo', 'bar', 'baz', 'foo'];
  const [list, setList] = useState<string[]>(FAKE_LIST);
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
        resolve(setList([...list, ...FAKE_LIST]));
      }, 3000);
    });
  };

  return (
    <div className="App">
      <div className="caker-header">
        <div className="caker-header-side"></div>
        <div className="caker-header-center">
          <div className="caker-header-wrapper">
            <div className="caker-header-title">
              <span>CAKER</span>
            </div>
            <div className="caker-header-content">
              <span>200km</span>
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
          onRefresh={getNewData}
          canFetchMore={canFetchMore}
          isPullable={isPullable}
          onFetchMore={getNewData}
          fetchMoreThreshold={fetchMoreThreshold}
          pullDownThreshold={pullDownThreshold}
          maxPullDownDistance={maxPullDownDistance}
          className={"pull-to-refresh"}>
          <div className="caker-container">
            <div style={{ width: '100%', marginBottom: '1vh' }}>
              <img alt="" src={Forky} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '1vh' }}>
              <img alt="" src={BrownHands} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '1vh' }}>
              <img alt="" src={Pic} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '1vh' }}>
              <img alt="" src={Night} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '1vh' }}>
              <img alt="" src={BrownHands} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
          </div>
        </PullToRefresh>
        </div>
        <div className="caker-body-side"></div>
      </div>
      <div className="caker-footer">
        <div className="caker-footer-side"></div>
        <div className="caker-footer-center">
          <div className="caker-footer-bar">&nbsp;</div>
          <div className="caker-footer-wrapper">
            <div className="caker-footer-button-wrapper">
              <img src={Maps} className="icon-color caker-footer-button"></img>
            </div>
            <div className="caker-footer-button-wrapper">
              <img src={Notes} className="icon-color caker-footer-button"></img>
            </div>
            <div className="caker-footer-button-wrapper">
              <img src={Books} className="icon-color caker-footer-button"></img>
            </div>
            <div className="caker-footer-button-wrapper">
              <img src={Settings} className="icon-color caker-footer-button"></img>
            </div>
          </div>
        </div>
        <div className="caker-footer-side"></div>
      </div>
    </div>
  );
};

export default App;