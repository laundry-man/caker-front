import React from 'react';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import detail from '../../static/css/profile/detail.module.css';

type DetailProps = {
    isStretch: boolean,
    setIsStretch: React.Dispatch<React.SetStateAction<boolean>>
}

function Detail({ isStretch, setIsStretch }: DetailProps) {
    return (
        <div className={classNames([detail.detailWrapper, index.fadeInFast])}
            style={{ height: !isStretch ? '3.5vh' : '14vh' }}>
            <div className={detail.detail} onClick={() => setIsStretch(!isStretch)}>
                <div className={detail.nameWrapper}>
                    <div className={detail.name}>
                        rainmaker
                    </div>
                </div>
            </div>
            <div className={detail.append} 
                onClick={() => setIsStretch(!isStretch)}>
                {!isStretch ?
                    <div className={index.fadeInFast}>
                        <div className={detail.dot}>●</div>
                    </div> :
                    <></>}
            </div>
        </div>
    );
}

export default Detail;