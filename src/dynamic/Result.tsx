import React, { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

import ViewList from './ViewList';

import { ResultProps } from '../const/Type';

function Result({ tag }: ResultProps) {
    const base: string[][] = [];
    const [pathList, setPathList] = useState(base);

    const getNewData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setPathList([...pathList, ...pathList]));
            }, 1000);
        });
    };

    const resetData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setPathList(base));
            }, 1000);
        });
    }

    const dummySearch = (tag: string) => {
        
    }

    useEffect(() => {
        dummySearch(tag);
    });

    return (
        <PullToRefresh
          onRefresh={getNewData}
          canFetchMore={true}
          isPullable={true}
          onFetchMore={resetData}
          fetchMoreThreshold={0}
          pullDownThreshold={67}
          maxPullDownDistance={95}
          className={"pull-to-refresh fade-in-fast"}>
          <ViewList paths={pathList}></ViewList>
        </PullToRefresh>
    );
}

export default Result;