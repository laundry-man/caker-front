import React, { useState } from 'react';

import index from '../../static/css/index.module.css';
import geoTagView from '../../static/css/geotagsearch/geoTagView.module.css';

type GeoTagViewProps = {
    path: string,
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

function GeoTagView({
    path,
    redirect,
    setContent,
    setPredecessor }: GeoTagViewProps) {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    function getNextView() {
        if (toggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setContent('#고래상점');
            setPredecessor('/geotagsearch');
            redirect('/tagsearchresult');
        }
        else if (isLoaded) {
            setToggle(true);
            setTimer(
                setTimeout(() => {
                    setToggle(false)
                }, 5000)
            );
        }
    }

    function getImageSize(width: number, height: number) {
        setWidth(width);
        setHeight(height);
        setIsLoaded(true);
    };

    return (
        <div className={geoTagView.wrapper} onClick={getNextView}>
            {toggle ? 
                <BackView 
                    path={path} 
                    width={width} 
                    height={height}
                /> : 
                <FrontView 
                    path={path}
                    width={width}
                    height={height}
                    isLoaded={isLoaded}
                    getImageSize={getImageSize}
                />
            }
        </div>
    );
}

type FrontViewProps = {
    path: string,
    width: number,
    height: number,
    isLoaded: boolean,
    getImageSize: (width: number, height: number) => void
};

function FrontView({ 
    path, 
    width, 
    height, 
    isLoaded,
    getImageSize}: FrontViewProps) {

    return (
        <div className={index.fadeInFast} 
            style={{ 
                width: isLoaded ? width : 'auto', 
                height: isLoaded ? height : 'auto'
            }}>
            <div className={geoTagView.dotWrapper}>
                <div className={geoTagView.dot}>●</div>
            </div>
            <img className={geoTagView.image} alt="" src={path}
                onLoad={(e) => { 
                    if (!isLoaded) 
                        getImageSize(e.currentTarget.width, e.currentTarget.height); 
                }} 
            />
        </div>
    );
}

type BackViewProps = {
    path: string,
    width: number,
    height: number
};

function BackView({ 
    path, 
    width, 
    height }: BackViewProps) {

    return (
        <div className={index.fadeInFast}>
            <div className={geoTagView.dotWrapper}>
                <div className={geoTagView.dot}>●</div>
            </div>
            <div className={geoTagView.detailWrapper} 
                style={{ width: width, height: height, backgroundImage: 'url(' + path + ')' }}>
                <div className={geoTagView.detail} 
                    style={{ width: width, height: height }}>
                    <div className={geoTagView.tag}>#고래상점</div>
                    <div className={geoTagView.distance}>1.2KM 44K</div>
                </div>
            </div>
        </div>
    );
}

export default GeoTagView;