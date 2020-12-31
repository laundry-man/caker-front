import React, { useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import ViewList from './ViewList';
import '../static/css/main.css';

import Matin1 from '../static/image/matin_1.png';
import Matin2 from '../static/image/matin_2.png';
import Matin3 from '../static/image/matin_3.png';
import Matin4 from '../static/image/matin_4.png';
import Anthracite1 from '../static/image/anthracite_1.png';
import Anthracite2 from '../static/image/anthracite_2.png';
import Anthracite3 from '../static/image/anthracite_3.png';
import Anthracite4 from '../static/image/anthracite_4.png';
import BrownHands1 from '../static/image/brownhands_1.png';
import BrownHands2 from '../static/image/brownhands_2.png';
import BrownHands3 from '../static/image/brownhands_3.png';
import BrownHands4 from '../static/image/brownhands_4.png';
import PotatoField1 from '../static/image/potatofield_1.png';
import PotatoField2 from '../static/image/potatofield_2.png';
import PotatoField3 from '../static/image/potatofield_3.png';
import PotatoField4 from '../static/image/potatofield_4.png';
import Terarosa1 from '../static/image/terarosa_1.png';
import Terarosa2 from '../static/image/terarosa_2.png';
import Terarosa3 from '../static/image/terarosa_3.png';
import Terarosa4 from '../static/image/terarosa_4.png';

function Main() {
    const base: string[][] = [
        [Matin1, Matin2, Matin3, Matin4],
        [Anthracite1, Anthracite2, Anthracite3, Anthracite4],
        [BrownHands1, BrownHands2, BrownHands3, BrownHands4],
        [PotatoField1, PotatoField2, PotatoField3, PotatoField4],
        [Terarosa1, Terarosa2, Terarosa3, Terarosa4]
    ];
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
        <PullToRefresh
            onRefresh={resetData}
            canFetchMore={canFetchMore}
            isPullable={isPullable}
            onFetchMore={getNewData}
            fetchMoreThreshold={fetchMoreThreshold}
            pullDownThreshold={pullDownThreshold}
            maxPullDownDistance={maxPullDownDistance}
            className={"pull-to-refresh fade-in-fast"}>
            <ViewList paths={path}></ViewList>
        </PullToRefresh>
    );
}

export default Main;