import React, { useState } from 'react';

import Detail from './Detail';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import profile from '../../static/css/profile/profile.module.css';

function Profile() {
    const [isStretch, setIsStretch] = useState(false);

    return (
        <div>
            <Detail 
                isStretch={isStretch}
                setIsStretch={setIsStretch}
            />
            <div style={{width: '80vw', height: isStretch ? '0.3vh' : '3.5vh', background: '#e3e2de', borderRadius: '5px', transition: 'height 0.3s'}}>
                <div style={{display: isStretch ? 'none' : 'flex', paddingLeft: '5vw', fontFamily: 'San Francisco', fontSize: '0.8rem', paddingTop: '0.5vh', color: '#333'}}>검색</div>
            </div>
            <div style={{width: '80vw', height: '1.5vh', borderRadius: '5px', border: '0.3vh solid #e3e2de', transition: 'height 0.3s', marginTop: '1vh'}}></div>
            <div style={{paddingLeft: '0.2vw', paddingTop: '1vh'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1vh'}}>
                    <div style={{width: '1.5vh', height: '7vh'}}>
                        <div className={profile.dot} style={{height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            ●
                        </div>
                    </div>
                    <div style={{height: '7vh'}}>
                        <div style={{width: 'calc(80vw - 1.5vh)', height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            <div style={{fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '0.2vw', fontFamily: 'San Francisco'}}>raingurl</div>
                        </div>
                        <div style={{width: 'calc(80vw - 1.5vh)', height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '41vw', height: '3vh', background: '#333', borderRadius: '5px', color: '#F2F1ED', fontSize: '0.8rem', paddingTop: '0.3vh', paddingLeft: '1.5vw', fontFamily: 'San Francisco'}}>
                                이 카페 자주오시나봐요!
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1vh'}}>
                    <div style={{width: '1.5vh', height: '7vh'}}>
                        <div className={profile.dot} style={{height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            ●
                        </div>
                    </div>
                    <div style={{height: '7vh'}}>
                        <div style={{width: 'calc(80vw - 1.5vh)', height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            <div style={{fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '0.2vw', fontFamily: 'San Francisco'}}>jelly</div>
                        </div>
                        <div style={{width: 'calc(80vw - 1.5vh)', height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '10vw', height: '3vh', background: '#333', borderRadius: '5px', color: '#F2F1ED', fontSize: '0.8rem', paddingTop: '0.3vh', paddingLeft: '1.5vw', fontFamily: 'San Francisco'}}>
                                안녕
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '1.5vh', height: '7vh'}}>
                        <div className={profile.dot} style={{height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            ●
                        </div>
                    </div>
                    <div style={{height: '7vh'}}>
                        <div style={{width: 'calc(80vw - 1.5vh)', height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            <div style={{fontSize: '0.8rem', fontWeight: 'bold', paddingLeft: '0.2vw'}}>laundryman</div>
                        </div>
                        <div style={{width: 'calc(80vw - 1.5vh)', height: '3.5vh', display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '18vw', height: '3vh', background: '#333', borderRadius: '5px', color: '#F2F1ED', fontSize: '0.8rem', paddingTop: '0.3vh', paddingLeft: '1.5vw'}}>
                                빨래 하쉴
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;