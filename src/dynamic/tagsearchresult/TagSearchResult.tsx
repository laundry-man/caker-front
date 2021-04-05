import React, { useEffect, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import PostList from './PostList';

import { Page } from '../../const/Constant';

import Matin1 from '../../static/image/matin_1.png';
import Matin2 from '../../static/image/matin_2.png';
import Matin3 from '../../static/image/matin_3.png';
import Matin4 from '../../static/image/matin_4.png';
import Anthracite1 from '../../static/image/anthracite_1.png';
import Anthracite2 from '../../static/image/anthracite_2.png';
import Anthracite3 from '../../static/image/anthracite_3.png';
import Anthracite4 from '../../static/image/anthracite_4.png';
import BrownHands1 from '../../static/image/brownhands_1.png';
import BrownHands2 from '../../static/image/brownhands_2.png';
import BrownHands3 from '../../static/image/brownhands_3.png';
import BrownHands4 from '../../static/image/brownhands_4.png';
import PotatoField1 from '../../static/image/potatofield_1.png';
import PotatoField2 from '../../static/image/potatofield_2.png';
import PotatoField3 from '../../static/image/potatofield_3.png';
import PotatoField4 from '../../static/image/potatofield_4.png';
import Terarosa1 from '../../static/image/terarosa_1.png';
import Terarosa2 from '../../static/image/terarosa_2.png';
import Terarosa3 from '../../static/image/terarosa_3.png';
import Terarosa4 from '../../static/image/terarosa_4.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';

type TagSearchResultProps = {
    tag: string,
    redirect: (page: Page) => void
}

function TagSearchResult({ tag }: TagSearchResultProps) {
    const base: string[][] = [
        [Matin1, Matin1, Matin3, Matin4],
        [Anthracite1, Anthracite1, Anthracite3, Anthracite4],
        [BrownHands1, BrownHands1, BrownHands3, BrownHands4],
        [PotatoField1, PotatoField1, PotatoField3, PotatoField4],
        [Terarosa1, Terarosa1, Terarosa3, Terarosa4]
    ];

    const [imagePathListList, setImagePathListList] = useState(base);

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

    function dummySearch(tag: string) {
        
    }

    useEffect(() => {
        dummySearch(tag);
    });

    return (
        <PullToRefresh
          onRefresh={resetData}
          canFetchMore={true}
          isPullable={true}
          onFetchMore={getNewData}
          fetchMoreThreshold={0}
          pullDownThreshold={67}
          maxPullDownDistance={95}
          className={classNames([index.pullToRefresh, index.fadeInFast])}>
          <PostList imagePathListList={imagePathListList} />
        </PullToRefresh>
    );
}

export default TagSearchResult;