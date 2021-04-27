import React, { useState, useEffect, useRef } from 'react'

import { Page, MY_POST_LIST, TAG_SEARCH_RESULT, ENTER_KEY, EMPTY_STRING } from '../../const/Constant';

import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';

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
        roomId: string,
        name: string
    }

    type Message = {
        type: string,
        roomId: string,
        sender: string,
        message: string
    }

    let sock = new SockJS("http://localhost:8080/ws-stomp");
    let ws = Stomp.Stomp.over(sock);

    let reconnect = 0;

    function connect() {
        ws.connect({},
            function (frame: any) {
                ws.subscribe(
                    "/sub/chat/room/" + '6cc72931-a2bd-4cad-b28c-e2fcfa4ce663', 
                    function (message) {
                        var recv: Message = JSON.parse(message.body);
                        recvMessage(recv);
                    }
                );
                ws.send(
                    "/pub/chat/message/", 
                    {}, 
                    JSON.stringify(
                        { 
                            type: 'ENTER', 
                            roomId: '6cc72931-a2bd-4cad-b28c-e2fcfa4ce663',
                            sender: 'rainmaker' 
                        }
                    )
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

    function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === ENTER_KEY) {
            ws.send("/pub/chat/message", {}, JSON.stringify({type:'TALK', roomId:'6cc72931-a2bd-4cad-b28c-e2fcfa4ce663', sender:'rainmaker', message:textRef.current?.value}));
        }
    };

    function recvMessage(message: Message) {
        setRoomList([...roomList, message.message]);
    }

    async function findAllRoom() {
        const response = await fetch(
            `http://localhost:8080/chat/rooms/`,
            {
                method: 'GET',
                mode: 'cors'
            });
        if (response.ok) {
            const text = await response.text();
            const array: Room[] = JSON.parse(text);
            const roomList_: string[] = [];
            for (let i = 0; i < array.length; i++)
                roomList.push(array[i].name);
            setRoomList([...roomList, ...roomList_]);
        }
    }

    async function createRoom() {
        const response = await fetch(
            `http://localhost:8080/chat/room/`,
            {
                method: 'POST',
                mode: 'cors',
                body: new URLSearchParams({
                    'name': '다같이1'
                })
            });
        if (response.ok)
            findAllRoom();
    }

    useEffect(() => {
        connect();
    });

    const textRef = useRef<HTMLInputElement>(null);

    return (
        <div className={classNames([myPostList.container, index.fadeInFast])}>
            <div className={myPostList.tier}>{tier}</div>
            <div className={myPostList.userName}>{userName}</div>
            <div className={myPostList.tier}>{tier}</div>
            <div style={{ width: '80vw', height: '3.5vh', background: '#f5f4f0', borderRadius: '5px', marginTop: '1vh' }} />
            <div style={{ marginTop: '1vh', fontSize: '0.5rem', color: '#f5f4f0' }}>●</div>
            <input type="text" ref={textRef}  onKeyUp={(e) => sendMessage(e)} />
            <div onClick={() => createRoom()}>CREATE A ROOM</div>
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