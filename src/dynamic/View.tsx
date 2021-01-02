import React, { useState } from 'react';
import { ViewProps } from '../const/Types';

function View({ path }: ViewProps) {
    const [active, setActive] = useState(() => {
        let _active: boolean[] = [];
        for (let i = 0; i < path.length; i++)
            _active.push(!i ? true : false);
        return _active;
    });

    const getNextView = () => {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    };

    return (
        <div className="view-wrapper" onClick={getNextView}>
            {active.map((active, index) => {
                if (active)
                    return (<img key={index} className="view fade-in-fast" alt="" src={path[index]}></img>);
                else
                    return (<img key={index} className="view invisible" alt="" src={path[index]}></img>);
            })}
        </div>
    );
}

export default View;