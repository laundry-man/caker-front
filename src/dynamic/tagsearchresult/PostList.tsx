import React from 'react';

import Post from './Post';

import postList from '../../static/css/tagsearchresult/postList.module.css';

type PostListProps = {
    pathListList: string[][]
};

function PostList({ pathListList }: PostListProps) {
    return (
        <div className={postList.container}>
            {pathListList.map((pathList, key) => <Post key={key} pathList={pathList} />)}
        </div>
    );
}

export default PostList;