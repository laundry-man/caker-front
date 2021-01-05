import React, { useEffect, useState } from 'react';
import { ViewProps } from '../const/Types';
import Matin1 from '../static/image/matin_1.png';

function View({ path }: ViewProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const getViewSize = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    }

    const getNextView = () => {
        if (toggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setToggle(false);
        }
        else if (width && height) {
            setToggle(true);
            setTimer(
                setTimeout(() => {
                    setToggle(false)
                }, 3000)
            );
        }
    }

    return (
        <div className="view-wrapper" onClick={getNextView}>
            <div className={toggle ? "invisible" : "fade-in-fast"}>
                <div className="view-tag" >#고래상점downtown</div>
                <img className="view-image" alt="" src={Matin1}
                    onLoad={(e) => { getViewSize(e.currentTarget.width, e.currentTarget.height) }} />
            </div>
            <div className={toggle ? "fade-in-fast" : "invisible"}>
                <div className="view-container" style={{width: width + 'px', height: height + 'px'}}></div>
            </div>
        </div>
    );
}

export default View;