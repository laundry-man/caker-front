import React, { useState, useEffect } from 'react'

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageList from '../../static/css/postupload/imageList.module.css';

export function ImageListSkeleton() {
    return (
        <div className={imageList.imageList} />
    );
}

type ImageListProps = {
    imagePathList: string[]
};

export function ImageList1({ imagePathList }: ImageListProps) {
    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < imagePathList.length; i++)
            _active.push(!i ? true : false);
        return _active;
    })());

    function getNextView() {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    };

    return (
        <div onClick={getNextView}>
            {active.map((active, imageIndex) => {
                if (active)
                    return <ActiveView imagePath={imagePathList[imageIndex]} />;
                return <></>;
            })}
        </div>
    );
}

export function ImageList2({ imagePathList }: ImageListProps) {
    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < imagePathList.length; i++)
            _active.push(!i ? true : false);
        return _active;
    })());

    function getNextView() {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    };

    return (
        <div onClick={getNextView}>
            {active.map((active, imageIndex) => {
                if (active)
                    return <ActiveView imagePath={imagePathList[imageIndex]} />;
                return <></>;
            })}
        </div>
    );
}

type ActiveViewProps = {
    imagePath: string
};

function ActiveView({ imagePath }: ActiveViewProps) {
    return (
        <div className={classNames([imageList.imageList, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')' }} />
    );
}