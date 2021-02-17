import React, { useState, useEffect } from 'react'

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageList from '../../static/css/postupload/imageList.module.css';

export function ImageListSkeleton() {
    return (
        <div className={imageList.image} />
    );
}

type ImageListProps = {
    rearrange: number,
    comment: string,
    imagePathList: string[]
};

export function ImageList({ 
    rearrange, 
    comment, 
    imagePathList }: ImageListProps) {

    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < imagePathList.length; i++)
            _active.push(rearrange ? i === 1 ? true : false : i === 0 ? true : false);
        return _active;
    })());

    function getNextView() {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    };

    useEffect(() => { console.log(rearrange); }, []);

    return (
        <div onClick={getNextView}>
            {active.map((active, activeIndex) => {
                if (active) {
                    return (<ActiveView 
                                comment={comment}
                                imageIndex={activeIndex} 
                                imagePath={imagePathList[activeIndex]} 
                            />);
                }
                return <></>;
            })}
        </div>
    );
}

type ActiveViewProps = {
    comment: string,
    imageIndex: number,
    imagePath: string
};

function ActiveView({ comment, imageIndex, imagePath }: ActiveViewProps) {
    return (
        <div className={classNames([imageList.image, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')' }}>
            {imageIndex === 1 ? 
                <div className={imageList.comment}>
                    <div style={{color: 'white'}}>{comment}</div>
                </div> : 
                <div />
            }
        </div>
    );
}