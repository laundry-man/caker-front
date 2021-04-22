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

type PostType = {
    isMine: boolean,
    isLiked: boolean,
    comment: string,
    cakeRating: number,
    theNumberOfLike: number,
    imagePathList: string[]
};

type TagSearchResultProps = {
    tag: string,
    redirect: (page: Page) => void
};

function TagSearchResult({ tag }: TagSearchResultProps) {

    const posts: PostType[] = [
        {
            isMine: tag === '#myposts' ? true : false, 
            isLiked: true, 
            comment: '서면에 위치한 카페 마틴입니다    제 기억에는 커피가 맛없어요    서면에 위치한 카페 마틴입니다', 
            cakeRating: 2, 
            theNumberOfLike: 123,
            imagePathList: [Matin1, Matin1, Matin3, Matin4]
        },
        {
            isMine: tag === '#myposts' ? true : false, 
            isLiked: false, 
            comment: '서면에 위치한 카페 마틴입니다    제 기억에는 커피가 맛없어요    서면에 위치한 카페 마틴입니다', 
            cakeRating: 2, 
            theNumberOfLike: 123,
            imagePathList: [Anthracite1, Anthracite1, Anthracite3, Anthracite4]
        },
        {
            isMine: tag === '#myposts' ? true : false, 
            isLiked: false, 
            comment: '서면에 위치한 카페 마틴입니다    제 기억에는 커피가 맛없어요    서면에 위치한 카페 마틴입니다', 
            cakeRating: 2, 
            theNumberOfLike: 123,
            imagePathList: [PotatoField1, PotatoField1, PotatoField3, PotatoField4]
        },
        {
            isMine: tag === '#myposts' ? true : false, 
            isLiked: false, 
            comment: '서면에 위치한 카페 마틴입니다    제 기억에는 커피가 맛없어요    서면에 위치한 카페 마틴입니다', 
            cakeRating: 2, 
            theNumberOfLike: 123,
            imagePathList: [Terarosa1, Terarosa1, Terarosa3, Terarosa4]
        }
    ];

    const [postList, setPostList] = useState<PostType[]>(posts);

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
          <PostList postListProp={postList} />
        </PullToRefresh>
    );
}

export default TagSearchResult;