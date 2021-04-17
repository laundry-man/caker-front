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
            <div style={{ fontFamily: 'YANGGIN', fontSize: '0.7rem', fontWeight: 'bold', color: '#F2F1ED', width: '80vw', height: '3.5vh', background: '#333', paddingTop: '0.8vh', borderRadius: '5px' }}>BEGINNER</div>
            <div style={{ fontFamily: 'WaitingfortheSunrise', color: '#333', fontWeight: 'bold', fontSize: '1.8rem', marginTop: '1.5vh', letterSpacing: '0.5px' }}>rainmaker</div>
            <div style={{ fontFamily: 'YANGGIN', marginTop: '2.5vh', fontSize: '0.7rem', fontWeight: 'bold', color: '#F2F1ED', width: '80vw', height: '3.5vh', background: '#333', paddingTop: '0.8vh', borderRadius: '5px' }}>BEGINNER</div>

            <div style={{ width: '80vw', display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '4vh' }}>
                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', letterSpacing: '0.5px' }}>tier : <b>beginner</b></div>

                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>ranking : <b>10</b></div>
                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>cake rating : <b>9993</b></div>

                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>the number of emails received : <b>102</b></div>

                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>most frequently used vibe :</div>
                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}><b>데이트하기 좋은</b></div>
                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}>most frequently used tag :</div>
                <div style={{ fontFamily: 'San Francisco', color: '#333', fontSize: '0.85rem', marginTop: '0.6vh', letterSpacing: '0.5px' }}><b>고래상점</b></div>
            </div>
            <div style={{ fontFamily: 'WaitingfortheSunrise',fontSize: '1.65rem',letterSpacing: '0.05rem',color: '#333', fontWeight: 'bold', marginTop: '31vh'}}>get my posts</div>
        </div>
    );
}

export default MyPostList;