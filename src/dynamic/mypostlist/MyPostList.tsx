import React, { useState, useEffect, useRef } from 'react'

import { Page, MY_POST_LIST, TAG_SEARCH_RESULT, ENTER_KEY, EMPTY_STRING } from '../../const/Constant';

import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames';
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

    const [roomList, setRoomList] = useState<string[]>([]);

    type Room = {
        topicId: string,
        name: string
    }

    type Message = {
        type: string,
        topicId: string,
        sender: string,
        message: string
    }

    let sock: WebSocket;
    let ws: Stomp.CompatClient;
    let session: string = uuidv4();

    const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIiwidWlkIjoic3RyaW5nIiwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiIsIlJPTEVfQURNSU4iXSwiaWF0IjoxNjIwMjAzOTM1LCJleHAiOjE2MjAyMDc1MzV9.SNf7e59N98Oe6M7J1Jrd9CV7tWXDUkrtQv--gc6gmJXPeGc99LSj4GtGHYKE-g8ZeoldEd0PMQ5Tds7EIFCfjdvY4DGpyDD6OBXb006cpqoMdqA4hUErncv2CbMp9IOmS3bF2TZyP3feWj_966PyIfMtElH5S9HeINgAkj-Oeh3upmRiY4I8FY3kuVoAIUxiH501rQbXPHlpNJgFb4DilNO3hPIhckP1eABYi6aWVcAuEjpwmHJTnEgxWae9gDFYJFHhOHiwlMfYMiaWBPyCYoDsjeAiYjJm1FatKUdxt48dJ89EUL9_B_ndcK26H7gbKl7ISs_ZQcAYehXt5l3Few';
    const subscriber = 'rnmkr@naver.com';
    const subscriber2 = 'jelly@naver.com';

    function connect() {
        sock = new SockJS("http://localhost:8080/ws-stomp", [], { sessionId: () => session });
        ws = Stomp.Stomp.over(sock);
    
        let reconnect = 0;
    
        ws.connect({'Authorization': `Bearer ${token}`},
            function (frame: any) {
                ws.subscribe(
                    "/sub/chat/topic/" + `${session}`,
                    function (message) {
                        var recv: Message = JSON.parse(message.body);
                        recvMessage(recv);
                    },
                    {'Authorization': `Bearer ${token}`, 'Subscriber': `${subscriber}`}
                );
            },
            function (error: any) {
                if (reconnect++ <= 5) {
                    setTimeout(function () {
                        console.log("connection reconnect");
                        sock = new SockJS("http://localhost:8080/ws-stomp");
                        ws = Stomp.Stomp.over(sock);
                        connect();
                    }, 10 * 1000);
                }
            }
        );
    }

    function disconnect() {
        ws.disconnect(
            function() {
                console.log('disconnected');
            }, 
            {'Authorization': `Bearer ${token}`}
        );
    }

    function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === ENTER_KEY) {
            ws.send(
                "/pub/chat/message", 
                {'Authorization': `Bearer ${token}`}, 
                JSON.stringify(
                    { 
                        type: 'TALK', 
                        topicId: `${subscriber}`, 
                        sender: `${subscriber}`, 
                        message: textRef.current?.value
                    }
                )
            );
        }
    };

    function recvMessage(message: Message) {
        setRoomList([...roomList, message.message]);
    }

    const textRef = useRef<HTMLInputElement>(null);

    return (
        <div className={classNames([myPostList.container, index.fadeInFast])}>
            <div className={myPostList.tier}>{tier}</div>
            <div className={myPostList.userName}>{userName}</div>
            <div className={myPostList.tier}>{tier}</div>
            <div style={{ width: '80vw', height: '3.5vh', background: '#f5f4f0', borderRadius: '5px', marginTop: '1vh' }} />
            <div style={{ marginTop: '1vh', fontSize: '0.5rem', color: '#f5f4f0' }}>●</div>
            <input type="text" ref={textRef}  onKeyUp={(e) => sendMessage(e)} />
            <div onClick={() => connect()}>CONNECT</div>
            <div onClick={() => disconnect()}>DISCONNECT</div>
            <div>
                {roomList.map((room, key) => <div key={key}>{room}</div>)}
            </div>
        </div>
    );
}

function Temp() {
    /*  <div>
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
      </div>*/
}

export default MyPostList;