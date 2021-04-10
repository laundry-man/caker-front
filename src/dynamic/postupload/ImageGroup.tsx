import React, { useState, useEffect } from 'react';

import { EMPTY_BLOCK, ADD_BLOCK, FILLED_BLOCK } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageGroup from '../../static/css/postupload/imageGroup.module.css';

import Matin1 from '../../static/image/matin_1.png';

type ImageGroupProps = { 
    shrinkFloor: number,
    blockList: number[],
    blockTouchEvent: (blockIndex: number, blockType: number) => void
};

function ImageGroup({shrinkFloor, blockList, blockTouchEvent}: ImageGroupProps) {
    return (
        <div>
            <div className={imageGroup.blockList}>
                {blockList[0] === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrinkFloor === 0} /> :
                        blockList[0] === ADD_BLOCK ? 
                            <AddBlock blockIndex={0} blockTouchEvent={blockTouchEvent} /> :
                            <FilledBlock blockIndex={0} imagePath={Matin1} blockTouchEvent={blockTouchEvent} />}
                <div style={{width: '1.5vh'}} />
                {blockList[1] === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrinkFloor === 0} /> :
                        blockList[1] === ADD_BLOCK ? 
                            <AddBlock blockIndex={1} blockTouchEvent={blockTouchEvent} /> : 
                            <FilledBlock blockIndex={1} imagePath={Matin1} blockTouchEvent={blockTouchEvent} />}
                <div style={{width: '1.5vh'}} />
                {blockList[2] === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrinkFloor === 0} /> :
                        blockList[2] === ADD_BLOCK ? 
                            <AddBlock blockIndex={2} blockTouchEvent={blockTouchEvent} /> : 
                            <FilledBlock blockIndex={2} imagePath={Matin1} blockTouchEvent={blockTouchEvent} />}
            </div>
            <div className={imageGroup.blockList}>
                {blockList[3] === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrinkFloor === 1} /> :
                        blockList[3] === ADD_BLOCK ? 
                            <AddBlock blockIndex={3} blockTouchEvent={blockTouchEvent} /> :
                            <FilledBlock blockIndex={3} imagePath={Matin1} blockTouchEvent={blockTouchEvent} />}
                <div style={{width: '1.5vh'}} />
                {blockList[4] === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrinkFloor === 1} /> :
                        blockList[4] === ADD_BLOCK ? 
                            <AddBlock blockIndex={4} blockTouchEvent={blockTouchEvent} /> : 
                            <FilledBlock blockIndex={4} imagePath={Matin1} blockTouchEvent={blockTouchEvent} />}
                <div style={{width: '1.5vh'}} />
                {blockList[5] === EMPTY_BLOCK ? 
                    <EmptyBlock isShrunk={shrinkFloor === 1} /> :
                        blockList[5] === ADD_BLOCK ? 
                            <AddBlock blockIndex={5} blockTouchEvent={blockTouchEvent} /> : 
                            <FilledBlock blockIndex={5} imagePath={Matin1} blockTouchEvent={blockTouchEvent} />}
            </div>
        </div>
    );
}

type AddBlockProps = {
    blockIndex: number,
    blockTouchEvent: (blockIndex: number, blockType: number) => void
}

function AddBlock({ blockIndex, blockTouchEvent }: AddBlockProps) {
    return (
        <div className={imageGroup.addBlock} onClick={() => blockTouchEvent(blockIndex, ADD_BLOCK)}>
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
    blockIndex: number,
    imagePath: string,
    blockTouchEvent: (blockIndex: number, blockType: number) => void
}

function FilledBlock({ blockIndex, imagePath, blockTouchEvent }: FilledBlockProps) {
    return (
        <div className={imageGroup.filledBlock} 
             style={{backgroundImage: 'url(' + imagePath + ')'}} 
             onClick={() => blockTouchEvent(blockIndex, FILLED_BLOCK)}/>
    );
}

export default ImageGroup;