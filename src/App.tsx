import React, { useState } from 'react';
import './App.css';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Commands from './commands';

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

  const [pullingContent, setPllingContent] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('#F2F1ED');

  return (
    <div className="App">
      <div className="App-header">
        CAKER
      </div>
      <div style={{height:'84vh'}}>
        <PullToRefresh
          pullingContent={pullingContent}
          onRefresh={getNewData}
          canFetchMore={canFetchMore}
          isPullable={isPullable}
          onFetchMore={getNewData}
          fetchMoreThreshold={fetchMoreThreshold}
          pullDownThreshold={pullDownThreshold}
          maxPullDownDistance={maxPullDownDistance}>
          <div style={{padding:0, margin:0}} className="App-container">
            
            <div style={{border: '1px solid black', borderRadius:'5px', width:'80vw', height:'80vw', backgroundColor:'black', margin: '10px'}}>

            </div>
            <div style={{border: '1px solid black', borderRadius:'5px', width:'80vw', height:'80vw', backgroundColor:'black', margin: '10px'}}>

            </div>
            <div style={{border: '1px solid black', borderRadius:'5px', width:'80vw', height:'80vw', backgroundColor:'black', margin: '10px'}}>

            </div>
            <div style={{border: '1px solid black', borderRadius:'5px', width:'80vw', height:'80vw', backgroundColor:'black', margin: '10px'}}>

            </div>
          </div>
        </PullToRefresh>
      </div>
      <div className="App-footer">
        CAKER
      </div>
    </div>
  );
};

export default App;