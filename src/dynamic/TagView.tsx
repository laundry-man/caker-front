import React, { useState } from 'react';

import { TagViewProps } from '../const/Type';

function TagView({ path, redirect, setContent, setPredecessor }: TagViewProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [loaded, setLoaded] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const getNextView = () => {
        if (toggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setContent('#고래상점');
            setPredecessor('/main');
            redirect('/result');
        }
        else if (loaded) {
            setToggle(true);
            setTimer(
                setTimeout(() => {
                    setToggle(false)
                }, 5000)
            );
        }
    }

    const getImageSize = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
        setLoaded(true);
    };

    function FrontTagView() {
        return (
            <div className="fade-in-fast" style={{ width: loaded ? width : 'auto', height: loaded ? height : 'auto' }}>
                <div className="tag-dot-wrapper">
                    <div className="tag-dot">●</div>
                </div>
                <img className="view-image" alt="" src={path}
                    onLoad={(e) => { if (!loaded) getImageSize(e.currentTarget.width, e.currentTarget.height); }} />
            </div>
        );
    }

    function BackTagView() {
        return (
            <div className="fade-in-fast">
                <div className="tag-dot-wrapper">
                    <div className="tag-dot">●</div>
                </div>
                <div className="tag-view-detail-wrapper" style={{ width: width, height: height, backgroundImage: 'url(' + path + ')' }}>
                    <div className="tag-view-detail" style={{ width: width, height: height }}>
                        <div className="tag-view-tag">#고래상점</div>
                        <div className="tag-view-distance">1.2KM 44K</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="view-wrapper" onClick={getNextView}>
            {toggle ? <BackTagView></BackTagView> : <FrontTagView></FrontTagView>}
        </div>
    );
}

export default TagView;