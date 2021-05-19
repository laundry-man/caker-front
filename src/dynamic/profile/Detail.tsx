import React from 'react';

import { Page, PROFILE, TAG_SEARCH_RESULT } from '../../const/Constant';

import Matin1 from '../../static/image/matin_1.png';

import Archive from '../../static/icon/archive-black-box.svg';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import detail from '../../static/css/profile/detail.module.css';

type DetailProps = {
    isStretch: boolean,
    isSettled: boolean,
    setIsStretch: React.Dispatch<React.SetStateAction<boolean>>,
    redirect: (page: Page) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
}

function Detail({ 
    isStretch,
    isSettled,
    setIsStretch,
    redirect,
    setContent,
    setPredecessor }: DetailProps) {

    function assignKeyword() {
        setContent("#myposts");
        setPredecessor(PROFILE);
        redirect(TAG_SEARCH_RESULT);
    }

    return (
        <div className={detail.detailWrapper}
            style={{ height: !isStretch ? '3.5vh' : '14vh' }}>
            <div className={detail.detail} onClick={() => setIsStretch(!isStretch)}>
                <div className={detail.nameWrapper}>
                    <div className={detail.name}>
                        rainmaker
                    </div>
                </div>
                <div>
                    <div className={detail.content}>
                        cake rating : <b>3220</b>
                    </div>
                    <div className={detail.content}>
                        ranking : <b>1032</b>
                    </div>
                    <div className={detail.content}>
                        tier : <b>strawberry</b>
                    </div>
                </div>
            </div>
            <div className={detail.imageWrapper}>
                <img alt="" src={Matin1} className={detail.image} style={{display: isStretch ? !isSettled ? 'block' : 'none' : 'none' }}/>
            </div>
            <div className={detail.append} 
                onClick={() => setIsStretch(!isStretch)}>
                {!isStretch ?
                    <div className={index.fadeInFast}>
                        <div className={detail.dot}>●</div>
                    </div> :
                    <img alt="" 
                         src={Archive} 
                         className={classNames([index.primaryColor, index.fadeInFast])} 
                         style={{width: '3.5vw'}} 
                         onClick={() => assignKeyword()} />}
            </div>
        </div>
    );
}

export default Detail;