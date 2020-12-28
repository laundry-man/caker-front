import React, { useState } from 'react';
import { ViewProps } from './Types';
import './static/css/view.css';

function View({path} : ViewProps) {
    let [active, setActive] = useState(() => {
        let _active : boolean[] = [];
        for (let i = 0; i < path.length; i++)
            _active.push(!i ? true : false);
        return _active;
    });

    const getNextView = () => {
        let _active : boolean[] = [...active];
        let _f : boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    };

    return (
        <div className="view-wrapper" onClick={getNextView}>
            {active.map((active, index) => {
                if (active)
                    return (<img className="view fade-in-view" alt="" src={path[index]}></img>);
                else 
                    return (<img className="view invisible" alt="" src={path[index]}></img>);
            })}
        </div>
    );
}

export default View;