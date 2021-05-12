import React, { useRef, useState, useEffect } from 'react';

import { Switch, Route, Link, useHistory } from 'react-router-dom';

import {
    EMPTY_STRING,
    Page,
    EMPTY_PAGE,
    GEO_TAG_SEARCH,
    TAG_SEARCH,
    TAG_SEARCH_RESULT,
    POST_UPLOAD,
    MY_POST_LIST,
    CONFIG,
    PROFILE,
    ENTER_KEY
} from '../const/Constant';

import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';

import GeoTagSearch from './geotagsearch/GeoTagSearch';
import TagSearch from './tagsearch/TagSearch';
import TagSearchResult from './tagsearchresult/TagSearchResult';
import PostUpload from './postupload/PostUpload';
import MyPostList from './mypostlist/MyPostList';
import Profile from './profile/Profile';
import Config from './config/Config';

import Glass from '../static/icon/magnifying-glass.svg';
import Maps from '../static/icon/map-marker.svg';
import Notes from '../static/icon/plus-black-symbol.svg';
import Cogs from '../static/icon/cog-wheel-silhouette.svg';
import Books from '../static/icon/reorder-option.svg';

import classNames from 'classnames';
import index from '../static/css/index.module.css';
import frame from '../static/css/frame.module.css';

type Message = {
    receiver: string,
    sender: string,
    message: string
}

function Frame() {
    const [content, setContent] = useState(EMPTY_STRING);

    const [predecessor, setPredecessor] = useState<Page>(EMPTY_PAGE);

    const [isTagSearch, setIsTagSearch] = useState(false);
    const [isPostUpload, setIsPostUpload] = useState(false);

    const pageHistory = useHistory<Page>();

    const redirect = (page: Page) => pageHistory.push(page);

    function clearContent() {
        if (predecessor !== EMPTY_PAGE) {
            setContent(EMPTY_STRING);
            redirect(predecessor);
            setPredecessor(EMPTY_PAGE);
        }
    }

    function pageDidMount(page: Page) {
        if (content !== EMPTY_STRING)
            setContent(EMPTY_STRING);
        setIsTagSearch(page === POST_UPLOAD || page === TAG_SEARCH);
        setIsPostUpload(page === POST_UPLOAD);
    }

    let sock: WebSocket;
    let ws: Stomp.CompatClient;

    const sessionId: string = uuidv4();

    const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIiwidWlkIjoic3RyaW5nIiwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiIsIlJPTEVfQURNSU4iXSwiaWF0IjoxNjIwMjc2MzM1LCJleHAiOjE2MjAyNzk5MzV9.TxxBqK4dZKWCHj9Z1kNtnjm8RkBucRxyQvI9bV2L3lHbe0d6InXhrQuDelcWUhTole7Oe7TOHhv6xoxrIiBFqegtC9YTnP-Hhs4QE_BZ-klLhAuyo-CKn3M-Mfr3B9rcRvDyfqOMuhj6kI30Tc1fqvZjWqbbBAAktyJbNHsQHUNca7i2rSPALALy_bcTp0YV1AYo7XjXSQfWAYMGyUHeoGZqrndMc_1mHBEqRonFgRnAF1jmmhioJj-6ovEgSxLUU9IR39Bz9ZMMnF6Nno1bfhKQg-ZdHHIqG2a38kdh_gjAbhpYeBLch0OcWjg9zCq7JiH42RgllISxjMdqWBkkng';
    
    const [subscriber, setSubscriber] = useState('rnmkr@naver.com');
    const [receiver, setReceiver] = useState('rnmkr@naver.com');

    function connect() {
        sock = new SockJS("http://localhost:8080/ws-stomp", [], { sessionId: () => sessionId });
        ws = Stomp.Stomp.over(sock);
    
        let reconnect = 0;
    
        ws.connect({'Authorization': `Bearer ${token}`},
            function (frame: any) {
                ws.subscribe(
                    "/sub/chat/topic/" + `${subscriber}`,
                    function (message) {
                        const recv: Message = JSON.parse(message.body);
                        receive(recv);
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

    function send() {
        ws.send(
            "/pub/chat/message", 
            {'Authorization': `Bearer ${token}`}, 
            JSON.stringify(
                { 
                    receiver: `${receiver}`, 
                    sender: `${subscriber}`, 
                    message: 'test drive',
                    sent: true
                }
            )
        );
    };

    function receive(message: Message) {
        console.log(message);
    }

    useEffect(() => {
        connect();
    }, []);

    return (
        <div className={classNames([!isPostUpload ? frame.primary : frame.secondary, index.fadeInSlow])}>
            <div className={frame.header}>
                <div className={frame.headerSide} />
                <div className={frame.headerCenter}>
                    <div className={frame.headerWrapper}>
                        <div className={!isPostUpload ? frame.headerTitlePrimary : frame.headerTitleSecondary}>
                            <div onClick={() => send()}>CAKER</div>
                        </div>
                        <div className={!isPostUpload ? frame.headerContentPrimary : frame.headerContentSecondary}>
                            <div onClick={() => clearContent()}>
                                {content}
                            </div>
                        </div>
                    </div>
                    <div className={!isPostUpload ? frame.headerBarPrimary : frame.headerBarSecondary}>&nbsp;</div>
                </div>
                <div className={frame.headerSide} />
            </div>
            <div className={frame.body}>
                <div className={frame.bodySide} />
                <div className={frame.bodyCenter}>
                    <Switch>
                        <Route exact path={"/" + GEO_TAG_SEARCH}>
                            <GeoTagSearch
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + TAG_SEARCH}>
                            <TagSearch
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + TAG_SEARCH_RESULT}>
                            <TagSearchResult
                                tag={content}
                                redirect={redirect}
                            />
                        </Route>
                        <Route exact path={"/" + POST_UPLOAD}>
                            <PostUpload
                                pageDidMount={pageDidMount}
                            />
                        </Route>
                        <Route exact path={"/" + MY_POST_LIST}>
                            <MyPostList 
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + PROFILE}>
                            <Profile 
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + CONFIG}>
                            <Config 
                                pageDidMount={pageDidMount} 
                            />
                        </Route>
                    </Switch>
                </div>
                <div className={frame.bodySide} />
            </div>
            <div className={frame.footer}>
                <div className={frame.footerSide} />
                <div className={frame.footerCenter}>
                    <div className={!isPostUpload ? frame.footerBarPrimary : frame.footerBarSecondary}>&nbsp;</div>
                    <div className={frame.footerWrapper}>
                        <Link to={isTagSearch ? GEO_TAG_SEARCH : TAG_SEARCH} className={frame.footerButtonWrapper}>
                            <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                        <Link to={POST_UPLOAD} className={frame.footerButtonWrapper}>
                            <img alt="" src={Notes} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                        <Link to={PROFILE} className={frame.footerButtonWrapper}>
                            <img alt="" src={Books} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                        <Link to={CONFIG} className={frame.footerButtonWrapper}>
                            <img alt="" src={Cogs} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                    </div>
                </div>
                <div className={frame.footerSide} />
            </div>
            <div className={frame.bottom} />
        </div>
    );
}

export default Frame;