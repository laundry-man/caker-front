import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import vibe from '../../static/css/postupload/vibe.module.css';

type VibeProps = {
    vibeIndex: number,
    vibeList: string[],
    isStretch: boolean,
    setIsStretch: React.Dispatch<React.SetStateAction<boolean>>,
    setVibeIndex: React.Dispatch<React.SetStateAction<number>>
};

function Vibe({ vibeIndex, vibeList, isStretch, setIsStretch, setVibeIndex }: VibeProps) {

    return (
        <div className={classNames([vibe.vibeWrapper, index.fadeInFast])}
            style={{ height: !isStretch ? '3.5vh' : '14vh' }}>
            <div className={vibe.prepend} onClick={() => setIsStretch(!isStretch)}>
                &nbsp;
            </div>
            <div className={vibe.vibe} onClick={() => setIsStretch(!isStretch)}>
                <div className={vibe.nameWrapper}>
                    <div className={vibe.name}>
                        {vibeList[vibeIndex]}
                    </div>
                </div>
                <div>
                    <div className={vibe.content}>
                        분위기 있는 카페 콘하스
                    </div>
                    <div className={vibe.content}>
                        커피가 맛있는 테일러 커피
                    </div>
                    <div className={vibe.content}>
                        조용하고 넓은 스타벅스
                    </div>
                </div>
            </div>
            <div className={vibe.append} 
                onClick={() => { 
                    if (!isStretch)
                        setVibeIndex(vibeIndex == vibeList.length - 1 ? 0 : vibeIndex + 1);
                    else 
                        setIsStretch(!isStretch); 
                    }
                }>
                {!isStretch ?
                    <div className={index.fadeInFast}>
                        <div className={vibe.dot}>●</div>
                    </div> :
                    <></>}
            </div>
        </div>
    );
}

export default Vibe;