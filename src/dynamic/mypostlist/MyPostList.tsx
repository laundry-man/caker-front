import React, { useEffect } from 'react'

import { Page, MY_POST_LIST } from '../../const/Constant';

import myPostList from '../../static/css/mypostlist/myPostList.module.css';

type MyPostListProps = {
    pageDidMount: (page: Page) => void
};

function MyPostList({ pageDidMount }: MyPostListProps) {
    
    useEffect(() => {
        pageDidMount(MY_POST_LIST);
    }, []);

    return (
        <div className={myPostList.container}>
            <div>RAINMAKER</div>
            <div>VIBE :</div>
            <div>TAG :</div>
            <div>SCORE :</div>
            <div>SCORE :</div>
        </div>
    );
}

export default MyPostList;