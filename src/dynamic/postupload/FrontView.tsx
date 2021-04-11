import React, { useEffect, useState } from 'react'

import Vibe from './Vibe';
import ImageGroup from './ImageGroup';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import frontView from '../../static/css/postupload/frontView.module.css';

type FrontViewProps = {
    blink: boolean,
    isEnabled: boolean,
    vibeIndex: number,
    vibeList: string[],
    shrinkFloor: number,
    imagePathList: string[],
    blockList: number[],
    blockTouchEvent: (blockIndex: number, blockType: number) => void,
    getNextView: () => void,
    setVibeIndex: React.Dispatch<React.SetStateAction<number>>
};

function FrontView({ 
    blink,
    isEnabled,
    vibeIndex,
    vibeList,
    shrinkFloor,
    imagePathList,
    blockList, 
    blockTouchEvent,
    getNextView,
    setVibeIndex }: FrontViewProps) {

    const [isStretch, setIsStretch] = useState(false);

    return (
        <div className={index.fadeInSlow}>
            <Vibe 
                vibeIndex={vibeIndex} 
                vibeList={vibeList}
                setVibeIndex={setVibeIndex} 
                isStretch={isStretch} 
                setIsStretch={setIsStretch} 
            />
            <div className={frontView.separator} style={{height: isStretch ? '0.3vh' : '3.5vh'}}/>
            <ImageGroup 
                key={blink ? 1 : 0}
                shrinkFloor={shrinkFloor}
                imagePathList={imagePathList}
                blockList={blockList}
                blockTouchEvent={blockTouchEvent}
            />
            <div className={frontView.nextButtonWrapper}>
                <div className={classNames([frontView.nextButton, isEnabled ? index.fadeInFast : index.nonDisplay])}
                    onClick={() => getNextView()}>
                    next
                </div>
            </div>
        </div>
    );
}

export default FrontView;