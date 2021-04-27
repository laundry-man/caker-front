import React from 'react';

import Post from './Post';

import { Page } from '../../const/Constant';

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
    postListProp: PostType[],
    redirect: (page: Page) => void
};

function PostList({ postListProp, redirect }: PostListProps) {
    return (
        <div className={postList.container}>
            {postListProp.map((post, key) => 
                <Post 
                    key={key} 
                    postProp={post}
                    redirect={redirect}
                />)}
        </div>
    );
}

export default PostList;