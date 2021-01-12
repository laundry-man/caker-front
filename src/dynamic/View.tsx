import React, { useState } from 'react';

import { ActiveViewProps, ViewProps } from '../const/Type';

function View({ path }: ViewProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [loaded, setLoaded] = useState(false);
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

    const getImageSize = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
        setLoaded(true);
    };

    function ActiveView({ path }: ActiveViewProps) {
        return (
            <div className="fade-in-fast" style={{ width: loaded ? width : 'auto', height: loaded ? height : 'auto' }}>
                <img className="view-image" alt="" src={path} onLoad={(e) => { if (!loaded) getImageSize(e.currentTarget.width, e.currentTarget.height); }}></img>
            </div>
        );
    }

    return (
        <div className="view-wrapper" onClick={getNextView}>
            {active.map((active, index) => { if (active) return (<ActiveView path={path[index]}></ActiveView>)})}
        </div>
    );
}

export default View;