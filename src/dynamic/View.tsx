import React, { useEffect, useState } from 'react';
import { ViewProps } from '../const/Types';
import Matin1 from '../static/image/matin_1.png';

function View({ path }: ViewProps) {
    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const [container, setContainer] = useState<JSX.Element>(<></>);

    const [active, setActive] = useState(() => {
        let _active: boolean[] = [];
        for (let i = 0; i < path.length; i++)
            _active.push(!i ? true : false);
        return _active;
    });

    const getViewSize = (width: number, height: number) => {
        setContainer(
            <div className="view-container" style={{width: {width} + 'px', height: {height} + 'px'}}></div>
        );
    };

    const getNextView = () => {
        if (toggle) {

        }
        else {
            setToggle(true);
        }
    }

    useEffect(() => {
        if (toggle) {
            setTimer(
                setTimeout(()=>{
                    setToggle(false)
                }, 3000)
            );
        }
    }, [toggle]);

    /*const getNextView = () => {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    };*/

    return (
        <div className="view-wrapper" onClick={getNextView}>
            {!toggle ?
                <>
                <div className="view-tag">#고래상점downtown</div>
                <img className="view-image" alt="" src={Matin1} 
                    onLoad={(e)=>{getViewSize(e.currentTarget.width, e.currentTarget.height)}}/>
                </> :
                {container}
            }
        </div>
    );
}

export default View;