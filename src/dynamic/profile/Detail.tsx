import React, { useState, useRef } from 'react';

import { Page, PROFILE, TAG_SEARCH_RESULT } from '../../const/Constant';

import Matin1 from '../../static/image/matin_1.png';

import Archive from '../../static/icon/archive-black-box.svg';
import Camera from '../../static/icon/photo-camera.svg';

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

    const [uploadToggle, setUploadToggle] = useState(false);

    const fileRef = useRef<HTMLInputElement>(null);

    function assignKeyword() {
        setContent("#myposts");
        setPredecessor(PROFILE);
        redirect(TAG_SEARCH_RESULT);
    }

    async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;

        if (length === 1) {
            const rawImagePath =
                (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(0));

            setUploadToggle(true);

            // 서버에서의 이미지 크롭 / 리사이징 / 저장

            setTimeout(() => {
                setUploadToggle(false);
            }, 3000);
        }
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
                <input ref={fileRef}
                       type="file"
                       accept="image/*"
                       style={{ display: 'none' }}
                       multiple={true}
                       onChange={(e) => onChange(e)} />
                <div className={detail.image} 
                    style={{display: isStretch ? !isSettled ? 'flex' : 'none' : 'none' }}
                    onClick={() => fileRef.current?.click()}>
                    {uploadToggle ? 
                        <Spinner /> : 
                        <img alt="" src={Camera} className={index.blurColor} style={{width: '3.5vw'}} /> }
                </div>
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

function Spinner() {
    return (
        <svg className={detail.spinner} >
            <circle className={detail.path} cx="2vh" cy="2vh" r="1vh" fill="none" stroke-width="0.3vh" />
        </svg>
    );
}

function Temp() {
    return (
        <img alt="" src={Matin1} className={detail.image} style={{display: true ? !true ? 'block' : 'none' : 'none' }}/>
    )
}

export default Detail;