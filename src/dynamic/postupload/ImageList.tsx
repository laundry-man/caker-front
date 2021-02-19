import React, { useState, useEffect } from 'react'

import { COMMENT_SPLIT_WIDTH, EMPTY_STRING } from '../../const/Constant';

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
    }

    function splitCommentByApproximateWidth(comment: string) {
        let split: string[] = [];
        let width: number = 0;
        let line: string = EMPTY_STRING;
        for (let i = 0, j = 0; j = comment.charCodeAt(i); i++) {
            const charWidth: number = j >> 11 ? 3 : j >> 7 ? 3 : 1.75;
            if (Math.ceil(width + charWidth) > COMMENT_SPLIT_WIDTH) {
                console.log(Math.ceil(width));
                split.push(line);
                line = comment[i];
                width = charWidth;
            } else {
                width += charWidth;
                line += comment[i];
            }
        }
        if (split.length !== 3)
            split.push(line);
        return split;
    }

    return (
        <div onClick={getNextView}>
            {active.map((active, key) => {
                if (active) {
                    return (
                        <ActiveView
                            key={key}
                            split={splitCommentByApproximateWidth(comment)}
                            imageIndex={key}
                            imagePath={imagePathList[key]}
                        />
                    );
                }
                return <></>;
            })}
        </div>
    );
}

type ActiveViewProps = {
    split: string[],
    imageIndex: number,
    imagePath: string
};

function ActiveView({
    split,
    imageIndex,
    imagePath }: ActiveViewProps) {
    return (
        <div className={classNames([imageList.image, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')' }}>
            {imageIndex === 1 ?
                <div className={imageList.comment}>
                    {split.length ?
                        <div style={{ color: 'white' }}>
                            {split.map((line, key) => {
                                return <div key={key}>{line}</div>
                            })}
                        </div> :
                        <div style={{ color: '#B3B3B3' }}>please write a comments</div>
                    }
                </div> :
                <div />
            }
        </div>
    );
}