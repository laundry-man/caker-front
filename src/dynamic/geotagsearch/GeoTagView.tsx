import React, { useState } from 'react';

import { Page, GEO_TAG_SEARCH, TAG_SEARCH_RESULT } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import geoTagView from '../../static/css/geotagsearch/geoTagView.module.css';

type GeoTagViewProps = {
    path: string,
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
}

function GeoTagView({
    path,
    redirect,
    setContent,
    setPredecessor }: GeoTagViewProps) {

    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    function getNextView() {
        if (toggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setContent('#고래상점');
            setPredecessor(GEO_TAG_SEARCH);
            redirect(TAG_SEARCH_RESULT);
        }
        else {
            setToggle(true);
            setTimer(
                setTimeout(() => {
                    setToggle(false)
                }, 5000)
            );
        }
    }

    return (
        <div onClick={getNextView}>
            {toggle ? 
                <BackView 
                    path={path} 
                /> : 
                <FrontView 
                    path={path}
                />
            }
        </div>
    );
}

type FrontViewProps = {
    path: string
};

function FrontView({ path }: FrontViewProps) {

    return (
        <div className={classNames([geoTagView.view, index.fadeInFast])} style={{ backgroundImage: 'url(' + path + ')'}}>
            <div className={geoTagView.header}>
                <div className={geoTagView.prepend}>&nbsp;</div>
                <div className={geoTagView.append}>
                    <div className={geoTagView.dot1}>
                        ●
                    </div>
                </div>
            </div>
        </div>
    );
}

type BackViewProps = {
    path: string,
};

function BackView({ path }: BackViewProps) {

    return (
        <div className={classNames([geoTagView.view, index.fadeInFast])} style={{ backgroundImage: 'url(' + path + ')'}}>
            <div className={geoTagView.backdrop}>
                <div className={geoTagView.header}>
                    <div className={geoTagView.prepend}>&nbsp;</div>
                    <div className={geoTagView.append}>
                        <div className={geoTagView.dot2}>
                            ●
                        </div>
                    </div>
                </div>
                <div className={geoTagView.info}>
                    <div className={geoTagView.tag}>#고래상점</div>
                    <div className={geoTagView.measured}>
                        <span>1.2km</span>
                        <span>&nbsp;</span>
                        <span>44k</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeoTagView;