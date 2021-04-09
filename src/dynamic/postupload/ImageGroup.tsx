import React, { useState, useEffect } from 'react';

import { EMPTY_BLOCK, ADD_BLOCK, FILLED_BLOCK } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageGroup from '../../static/css/postupload/imageGroup.module.css';

import Matin1 from '../../static/image/matin_1.png';

function ImageGroup() {
    const [filledBlockCount, setFilledBlockCount] = useState(0);
    const [shrunkFloor, setShrunkFloor] = useState(0);

    const [block1, setBlock1] = useState(EMPTY_BLOCK);
    const [block2, setBlock2] = useState(EMPTY_BLOCK);
    const [block3, setBlock3] = useState(EMPTY_BLOCK);
    const [block4, setBlock4] = useState(FILLED_BLOCK);
    const [block5, setBlock5] = useState(EMPTY_BLOCK);
    const [block6, setBlock6] = useState(ADD_BLOCK);

    const blockList: number[] = [block1, block2, block3, block4, block5, block6];
    const blockSetterList: 
        React.Dispatch<React.SetStateAction<number>>[] = 
        [setBlock1, setBlock2, setBlock3, setBlock4, setBlock5, setBlock6];

    function makeRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function assignAddBlock() {
        if (filledBlockCount >= 3)
            return;
        let blockIndex: number;
        while (blockList[(blockIndex = makeRandom(0, 5))] == FILLED_BLOCK);
        blockSetterList[blockIndex](ADD_BLOCK);
    }

    return (
        <div>
            <div className={imageGroup.blockList}>
                {block1 === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrunkFloor === 0} /> :
                        block1 === ADD_BLOCK ? 
                            <AddBlock /> : <FilledBlock imagePath={Matin1} />}
                <div style={{width: '1.5vh'}} />
                {block2 === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrunkFloor === 0} /> :
                        block2 === ADD_BLOCK ? 
                            <AddBlock /> : <FilledBlock imagePath={Matin1} />}
                <div style={{width: '1.5vh'}} />
                {block3 === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrunkFloor === 0} /> :
                        block3 === ADD_BLOCK ? 
                            <AddBlock /> : <FilledBlock imagePath={Matin1} />}
            </div>
            <div className={imageGroup.blockList}>
                {block4 === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrunkFloor === 1} /> :
                        block4 === ADD_BLOCK ? 
                            <AddBlock /> : <FilledBlock imagePath={Matin1} />}
                <div style={{width: '1.5vh'}} />
                {block5 === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrunkFloor === 1} /> :
                        block5 === ADD_BLOCK ? 
                            <AddBlock /> : <FilledBlock imagePath={Matin1} />}
                <div style={{width: '1.5vh'}} />
                {block6 === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrunkFloor === 1} /> :
                        block6 === ADD_BLOCK ? 
                            <AddBlock /> : <FilledBlock imagePath={Matin1} />}
            </div>
        </div>
    );
}

function AddBlock() {
    return (
        <div className={imageGroup.addBlock}>
            add
        </div>
    );
}

type EmptyBlockProps = {
    isShrunk: boolean
}

function EmptyBlock({ isShrunk }: EmptyBlockProps) {
    return (
        <div className={imageGroup.emptyBlock} style={{height: isShrunk ? '1.5vh' : 'calc((80vw - 3vh) / 3)'}} />
    );
}

type FilledBlockProps = {
    imagePath: string
}

function FilledBlock({ imagePath }: FilledBlockProps) {
    return (
        <div className={imageGroup.filledBlock} style={{backgroundImage: 'url(' + imagePath + ')'}} />
    );
}

export default ImageGroup;