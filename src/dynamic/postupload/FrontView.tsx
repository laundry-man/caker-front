import React, { useState } from 'react'

import Vibe from './Vibe';
import ImageGroup from './ImageGroup';

import index from '../../static/css/index.module.css';
import frontView from '../../static/css/postupload/frontView.module.css';

type FrontViewProps = {
    viewIndex: number,
    vibeIndex: number,
    vibeList: string[],
    shrinkFloor: number,
    imagePathList: string[],
    blockList: number[],
    blockTouchEvent: (blockIndex: number, blockType: number) => void,
    setVibeIndex: React.Dispatch<React.SetStateAction<number>>
};

function FrontView({ 
    viewIndex,
    vibeIndex,
    vibeList,
    shrinkFloor,
    imagePathList,
    blockList, 
    blockTouchEvent,
    setVibeIndex }: FrontViewProps) {

    const [isStretch, setIsStretch] = useState(false);

    return (
        <div className={viewIndex === 0 ? index.fadeInSlow : index.nonDisplay}>
            <Vibe 
                vibeIndex={vibeIndex} 
                vibeList={vibeList}
                setVibeIndex={setVibeIndex} 
                isStretch={isStretch} 
                setIsStretch={setIsStretch} 
            />
            <div className={frontView.separator} style={{height: isStretch ? '0.3vh' : '3.5vh'}}/>
            <ImageGroup 
                shrinkFloor={shrinkFloor}
                imagePathList={imagePathList}
                blockList={blockList}
                blockTouchEvent={blockTouchEvent}
            />
        </div>
    );
}

export default FrontView;