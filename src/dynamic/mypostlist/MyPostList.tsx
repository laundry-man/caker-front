import React, { useState, useEffect } from 'react'

import { Page, MY_POST_LIST, TAG_SEARCH_RESULT } from '../../const/Constant';

import index from '../../static/css/index.module.css';
import myPostList from '../../static/css/mypostlist/myPostList.module.css';

type MyPostListProps = {
    pageDidMount: (page: Page) => void,
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
};

function MyPostList({ 
    pageDidMount,
    redirect,
    setContent, 
    setPredecessor }: MyPostListProps) {

    const [tier, setTier] = useState("BEGINNER");
    const [userName, setUserName] = useState("rainmaker");

    const [ranking, setRanking] = useState(10);
    const [cakeRating, setCakeRating] = useState(9993);

    const [theNumberOfEmailsReceived, setTheNumberOfEmailsReceived] = useState(102);
    const [mostFrequentlyUsedVibe, setMostFrequentlyUsedVibe] = useState('"데이트하기 좋은"');
    const [mostFrequentlyUsedTag, setMostFrequentlyUsedTag] = useState('"고래상점"');

    function assignKeyword() {
        setContent("#myposts");
        setPredecessor(MY_POST_LIST);
        redirect(TAG_SEARCH_RESULT);
    }
      
    useEffect(() => {
        pageDidMount(MY_POST_LIST);
    }, []);

    return (
        <div className={index.fadeInFast}>
            <div className={myPostList.tier}>{tier}</div>
            <div className={myPostList.userName}>{userName}</div>
            <div className={myPostList.tier}>{tier}</div>
            <div className={myPostList.userInfoWrapper}>
                <div className={myPostList.userInfo}>tier : <b>{tier}</b></div>
                <div className={myPostList.userInfo}>ranking : <b>{ranking}</b></div>
                <div className={myPostList.userInfo}>cake rating : <b>{cakeRating}</b></div>
                <div className={myPostList.userInfo}>the number of emails received : <b>{theNumberOfEmailsReceived}</b></div>
                <div className={myPostList.userInfo}>most frequently used vibe :</div>
                <div className={myPostList.userInfo}><b>{mostFrequentlyUsedVibe}</b></div>
                <div className={myPostList.userInfo}>most frequently used tag :</div>
                <div className={myPostList.userInfo}><b>{mostFrequentlyUsedTag}</b></div>
            </div>
            <div className={myPostList.getMyPostsButton} onClick={() => assignKeyword()}>get my posts</div>
        </div>
    );
}

export default MyPostList;