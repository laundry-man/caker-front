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
            <div style={{ fontFamily: 'WaitingfortheSunrise', color: '#333', fontWeight: 'bold', fontSize: '2rem', marginTop: '1.5vh', letterSpacing: '0.5px' }}>raingurl</div>
            <div style={{ fontFamily: 'YANGGIN', marginTop: '2vh', fontSize: '0.75rem', fontWeight: 'bold'}}>BEGINNER</div>
            <div style={{ color: '#333333', fontSize: '0.5rem', marginTop: '2.5vh', marginBottom: '2vh' }}>●</div>
            <div style={{ width: '80vw', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '5vw' }}>&nbsp;</div>
                <div style={{ width: '70vw', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.8rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>tier : beginner</div>
                    <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.8rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>cake rating : 9993</div>
                    <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.8rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>frequently used vibe : 가까운</div>
                    <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.8rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>frequently used tag : 고래상점</div>
                    <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.8rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>number of emails received : 102</div>
                </div>
                <div style={{ width: '5vw' }}>&nbsp;</div>
            </div>
        </div>
    );
}

export default MyPostList;