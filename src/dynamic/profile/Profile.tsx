import React, { useEffect, useState } from 'react';

import { EMPTY_STRING, Page, PROFILE } from '../../const/Constant';

import FrontView from './FrontView';
import ChatView from './ChatView';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import profile from '../../static/css/profile/profile.module.css';

type ProfileProps = {
    pageDidMount: (page: Page) => void,
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
}

function Profile({ 
    pageDidMount,
    redirect,
    setContent,
    setPredecessor }: ProfileProps) {

    const [toggle, setToggle] = useState(false);
    const [currentKey, setCurrentKey] = useState(EMPTY_STRING);

    function enterChatRoom(key: string) {
        setCurrentKey(key);
        setToggle(true);
    }

    useEffect(() => {
        pageDidMount(PROFILE);
    }, []);

    return (
        <div>
            {toggle ?
                <ChatView /> :
                <FrontView 
                    redirect={redirect} 
                    setContent={setContent} 
                    setPredecessor={setPredecessor} 
                    enterChatRoom={enterChatRoom}
                />}
        </div>
    );
}

export default Profile;