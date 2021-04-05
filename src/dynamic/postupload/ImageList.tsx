import React, { useState, useEffect } from 'react'

import { THREE_PIECES_OF_CAKE, TWO_PIECES_OF_CAKE, A_PIECE_OF_CAKE } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageList from '../../static/css/postupload/imageList.module.css';

export function ImageListSkeleton() {
    return (
        <div className={imageList.image}>
            <div className={imageList.comment}>
                &nbsp;
            </div>
        </div>
    );
}

type ImageListProps = {
    rearrange: number,
    cakeRating: number,
    splitComment: string[],
    imagePathList: string[]
};

export function ImageList({
    rearrange,
    cakeRating,
    splitComment,
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

    return (
        <div onClick={getNextView}>
            {active.map((active, key) => {
                if (active) {
                    return (
                        <ActiveView
                            key={key}
                            cakeRating={cakeRating}
                            splitComment={splitComment}
                            isComment={key === 1 ? true : false}
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
    cakeRating: number,
    splitComment: string[],
    isComment: boolean,
    imagePath: string
};

function ActiveView({
    cakeRating,
    splitComment,
    isComment,
    imagePath }: ActiveViewProps) {
    return (
        <div className={classNames([imageList.image, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')' }}>
            {isComment ?
                <div className={imageList.comment}>
                    {splitComment.length ?
                        <div className={imageList.commentEnabled}>
                            {splitComment.map((line, key) => {
                                return <div key={key}>{line}</div>
                            })}
                        </div> :
                        <div className={imageList.commentDisabled}>
                            please write a comment
                        </div>
                    }
                    <div className={imageList.cakeRating}>
                        {cakeRating === 3 ? 
                            THREE_PIECES_OF_CAKE : 
                                cakeRating === 2 ? TWO_PIECES_OF_CAKE : 
                                    A_PIECE_OF_CAKE}
                    </div>
                </div> :
                <></>
            }
        </div>
    );
}