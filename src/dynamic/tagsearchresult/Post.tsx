import React, { useState } from 'react';

import index from '../../static/css/index.module.css';
import post from '../../static/css/tagsearchresult/post.module.css';

type PostProps = {
    pathList: string[]
};

function Post({ pathList }: PostProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);
    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < pathList.length; i++)
            _active.push(!i ? true : false);
        return _active;
    })());

    function getNextView() {
        if (isLoaded) {
            let _active: boolean[] = [...active];
            let _f: boolean | undefined = _active.pop();
            _active.unshift(_f === undefined ? false : _f);
            setActive(_active);
        }
    };

    function getImageSize(width: number, height: number) {
        setWidth(width);
        setHeight(height);
        setIsLoaded(true);
    };

    return (
        <div className={post.wrapper} onClick={getNextView}>
            {active.map((active, key) => { 
                if (active) {
                    return <ActiveView 
                                key={key}
                                path={pathList[key]}
                                width={width}
                                height={height}
                                isLoaded={isLoaded}
                                getImageSize={getImageSize}
                            />
                }
            })}
        </div>
    );
}

type ActiveViewProps = {
    path: string,
    width: number,
    height: number,
    isLoaded: boolean,
    getImageSize: (width: number, height: number) => void
};

function ActiveView({ 
    path, 
    width, 
    height, 
    isLoaded, 
    getImageSize }: ActiveViewProps) {

    return (
        <div className={index.fadeInFast} 
            style={{ 
                width: (isLoaded ? width : 'auto'), 
                height : (isLoaded ? height : 'auto') 
            }}>
            <img alt="" className={post.image} src={path} 
                onLoad={(e) => { 
                    if (!isLoaded) 
                        getImageSize(e.currentTarget.width, e.currentTarget.height); 
                }} 
            />
        </div>
    );
}

export default Post;