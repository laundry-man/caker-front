import React from 'react';

import Post from './Post';

import postList from '../../static/css/tagsearchresult/postList.module.css';

type PostListProps = {
    imagePathListList: string[][]
};

function PostList({ imagePathListList }: PostListProps) {
    return (
        <div className={postList.container}>
            {imagePathListList.map((imagePathList, key) => <Post key={key} commentInput={'커피가 맛있어요!'} cakeRating={2} imagePathList={imagePathList} />)}
        </div>
    );
}

export default PostList;