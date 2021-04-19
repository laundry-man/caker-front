import React from 'react';

import Post from './Post';

import postList from '../../static/css/tagsearchresult/postList.module.css';

type PostListProps = {
    isMine: boolean,
    imagePathListList: string[][]
};

function PostList({ isMine, imagePathListList }: PostListProps) {
    return (
        <div className={postList.container}>
            {imagePathListList.map((imagePathList, key) => 
                <Post 
                    key={key} 
                    isMine={isMine}
                    commentInput={'서면에 위치한 카페 마틴입니다    제 기억에는 커피가 맛없어요    서면에 위치한 카페 마틴입니다'} 
                    cakeRating={2} 
                    imagePathList={imagePathList} 
                />)
            }
        </div>
    );
}

export default PostList;