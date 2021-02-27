import React, { useEffect } from 'react'

import { Page, MY_POST_LIST } from '../../const/Constant';

import myPostList from '../../static/css/mypostlist.module.css';

type MyPostListProps = {
    pageDidMount: (page: Page) => void
};

function MyPostList({ pageDidMount }: MyPostListProps) {
    
    useEffect(() => {
        pageDidMount(MY_POST_LIST);
    }, []);

    return (
        <div></div>
    );
}

export default MyPostList;