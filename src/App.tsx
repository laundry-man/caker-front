import React, { useState } from 'react';
import './static/css/App.css';
import PullToRefresh from 'react-simple-pull-to-refresh';

import Forky from './static/image/forky.jpg';
import BrownHands from './static/image/brownhands.jpg';
import Pic from './static/image/pic.jpg';
import Night from './static/image/night-1846734_1920.jpg';

import Maps from './static/icon/008-maps.svg';
import Browser from './static/icon/036-browser.svg';
import Notes from './static/icon/010-notes.svg';
import Settings from './static/icon/025-settings.svg';
import Books from './static/icon/024-books.svg';

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
        <div className="caker-side"></div>
        <div className="caker-center">
          <div>CAKER</div>
          <div style={{background: '#333333', borderRadius: '5px', height: '2.5px', margin: '4px 1px 6px 1px'}}>&nbsp;</div>
        </div>
        <div className="caker-side"></div>
      </div>
      <div className="caker-body">
        <div className="caker-side"></div>
        <div className="caker-center">
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
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <img alt="" src={Forky} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <img alt="" src={BrownHands} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <img alt="" src={Pic} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <img alt="" src={Night} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <img alt="" src={BrownHands} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
            </div>
          </div>
        </PullToRefresh>
        </div>
        <div className="caker-side"></div>
      </div>
      <div className="caker-footer">
        <div className="caker-side"></div>
        <div className="caker-center">
          <div style={{background: '#333333', borderRadius: '5px', height: '2.5px', margin: '6px 1px 12px 1px'}}>&nbsp;</div>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <div style={{width:'20vw'}}><img src={Maps} width='35%'></img></div>
            <div style={{width:'20vw'}}><img src={Notes} width='35%'></img></div>
            <div style={{width:'20vw'}}><img src={Books} width='35%'></img></div>
            <div style={{width:'20vw'}}><img src={Settings} width='35%'></img></div>
          </div>
        </div>
        <div className="caker-side"></div>
      </div>
    </div>
  );
};

export default App;