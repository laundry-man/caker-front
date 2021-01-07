import React, { useState } from 'react';

import { EMPTY_STRING } from '../const/Constant';
import Matin1 from '../static/image/matin_1.png';

function TagView() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [imgSrc, setImgSrc] = useState(EMPTY_STRING);

    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const apiKey: string = 'n6m4itubfm';
    const latitude: number = 37.56617246693808;
    const longitude: number = 126.97789181585031;
    const color: string = '0x730D26';

    const setPlaceDetails = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
        setImgSrc([
            'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?',
            `w=${width * 2}`,
            `h=${height * 2}`,
            'scale=2',
            `markers=type:d|size:mid|pos:${longitude} ${latitude}|viewSizeRatio:0.8|color:${color}`,
            `X-NCP-APIGW-API-KEY-ID=${apiKey}`,
        ].join('&'));
    }

    const getNextView = () => {
        if (toggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setToggle(false);
        }
        else if (width && height) {
            setToggle(true);
            /*setTimer(
                setTimeout(() => {
                    setToggle(false)
                }, 5000)
            );*/
        }
    }

    return (
        <div className="view-wrapper" onClick={getNextView}>
            <div className={toggle ? "invisible" : "fade-in-fast"}>
                <div className="view-tag-1" >
                    <span>#고래상점</span>
                </div>
                <img className="view-image" alt="" src={Matin1}
                    onLoad={(e) => { setPlaceDetails(e.currentTarget.width, e.currentTarget.height) }} />
            </div>
            <div className={toggle ? "fade-in-fast" : "invisible"}>
                <div className="view-tag-2" >#고래상점</div>
                <div className="view-map-wrapper" style={{ width: width + 'px', height: height + 'px' }}>
                    <img className="view-map" src={imgSrc} alt="" />
                </div>
                <div className="view-detail-wrapper">
                    <div className="view-detail-1">
                        서울시 명동 120m
                    </div>
                    <div className="view-detail-2">44k</div>
                </div>
            </div>
        </div>
    );
}

export default TagView;