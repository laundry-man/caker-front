import React from 'react';

import Post from './Post';

import postList from '../../static/css/tagsearchresult/postList.module.css';

type PostType = {
    isMine: boolean,
    isLiked: boolean,
    comment: string,
    cakeRating: number,
    theNumberOfLike: number,
    imagePathList: string[]
};

type PostListProps = {
    postListProp: PostType[]
};

function PostList({ postListProp }: PostListProps) {
    return (
        <div className={postList.container}>
            {postListProp.map((post, key) => <Post key={key} postProp={post} />)}
        </div>
    );
}

export default PostList;