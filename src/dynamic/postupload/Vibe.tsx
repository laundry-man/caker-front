import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import vibe from '../../static/css/postupload/vibe.module.css';

type VibeProps = {
    isStretch: boolean,
    setIsStretch: React.Dispatch<React.SetStateAction<boolean>>
};

function Vibe({ isStretch, setIsStretch }: VibeProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [vibeList, setVibeList] = useState(['가까운']);
    const [vibeCount, setVibeCount] = useState(1);
    const [vibeId, setVibeId] = useState(0);

    useEffect(() => {
        // 컴포넌트 로드와 동시에 DB를 참조, 추가 VIBE 정보를 가져온다.
        if (!isLoaded) {
            const additional = ['데이트하기 좋은', '공부하기 좋은'];
            setVibeList([...vibeList, ...additional]);
            setVibeCount(vibeCount + additional.length);
            setIsLoaded(true);
        }
    }, []);

    /*useEffect(() => {
        사용자의 현재 좌표와 id를 이용해 인접 특별 게시글을 호출한다.
    }, []);*/

    return (
        <div className={classNames([vibe.vibeWrapper, index.fadeInFast])}
            style={{ height: !isStretch ? '3.5vh' : '14vh' }}>
            <div className={vibe.prepend} onClick={() => setIsStretch(!isStretch)}>
                &nbsp;
            </div>
            <div className={vibe.vibe} onClick={() => setIsStretch(!isStretch)}>
                <div className={vibe.nameWrapper}>
                    <div className={vibe.name}>
                        {vibeList[vibeId]}
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
                        setVibeId(vibeId == vibeCount - 1 ? 0 : vibeId + 1) 
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