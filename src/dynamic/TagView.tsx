import React, { useState } from 'react';

import { EMPTY_STRING } from '../const/Constant';
import { TagViewProps } from '../const/Type';
import Matin1 from '../static/image/matin_1.png';

function TagView({ redirect, setContent, setPredecessor }: TagViewProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [imgSrc, setImgSrc] = useState(EMPTY_STRING);

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
        else if (width && height) {
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
    };

    return (
        <div className="tag-view-wrapper" onClick={getNextView}>
            <div className={toggle ? "invisible" : "fade-in-fast"}>
                <div className="circle-wrapper">
                    <div className="circle-1"></div>
                </div>
                <img className="tag-view-image" alt="" src={Matin1}
                    onLoad={(e) => getImageSize(e.currentTarget.width, e.currentTarget.height)} />
            </div>
            <div className={toggle ? "fade-in-fast" : "invisible"}>
                <div className="circle-wrapper">
                    <div className="circle-2"></div>
                </div>
                <div className="tag-view-detail-wrapper" style={{width: width, height: height, backgroundImage: 'url(' + Matin1 + ')'}}>
                    <div className="tag-view-detail" style={{width: width, height: height}}>
                        <div className="tag-view-tag">#고래상점</div>
                        <div className="tag-view-distance">1.2KM 44K</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TagView;