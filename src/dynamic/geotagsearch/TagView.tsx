import React, { useState } from 'react';

import index from '../../static/css/index.module.css';
import tagView from '../../static/css/geotagsearch/tagView.module.css';

type TagViewProps = {
    path: string,
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

function TagView({
    path,
    redirect,
    setContent,
    setPredecessor }: TagViewProps) {

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
            setPredecessor('/geotagsearch');
            redirect('/tagsearchresult');
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

    function Primary() {
        return (
            <div className={index.fadeInFast} 
                style={{ 
                    width: loaded ? width : 'auto', 
                    height: loaded ? height : 'auto'
                }}>
                <div className={tagView.dotWrapper}>
                    <div className={tagView.dot}>●</div>
                </div>
                <img className={tagView.image} alt="" src={path}
                    onLoad={(e) => { 
                        if (!loaded) 
                            getImageSize(e.currentTarget.width, e.currentTarget.height); 
                        }
                    } 
                />
            </div>
        );
    }

    function Secondary() {
        return (
            <div className={index.fadeInFast}>
                <div className={tagView.dotWrapper}>
                    <div className={tagView.dot}>●</div>
                </div>
                <div className={tagView.detailWrapper} 
                    style={{ width: width, height: height, backgroundImage: 'url(' + path + ')' }}>
                    <div className={tagView.detail} 
                        style={{ width: width, height: height }}>
                        <div className={tagView.tag}>#고래상점</div>
                        <div className={tagView.distance}>1.2KM 44K</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={tagView.wrapper} onClick={getNextView}>
            {toggle ? <Secondary /> : <Primary />}
        </div>
    );
}

export default TagView;