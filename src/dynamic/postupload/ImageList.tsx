import React from 'react'

import Matin3 from '../../static/image/matin_3.png';

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

export function ImageList({ imagePathList }: ImageListProps) {
    return (
        <div className={classNames([imageList.imageList, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePathList[0] + ')' }} />
    );
}