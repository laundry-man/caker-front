import React, { useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import { MainProps } from '../const/Type';

import TagViewList from './TagViewList';
import '../static/css/main.css';

function Main({ setContent, setPredecessor }: MainProps) {
    const base: string[][] = [];
    const [path, setPath] = useState(base);

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
        <PullToRefresh
            onRefresh={resetData}
            canFetchMore={true}
            isPullable={true}
            onFetchMore={getNewData}
            fetchMoreThreshold={0}
            pullDownThreshold={67}
            maxPullDownDistance={95}
            className={"pull-to-refresh fade-in-fast"}>
            <TagViewList></TagViewList>
        </PullToRefresh>
    );
}

export default Main;