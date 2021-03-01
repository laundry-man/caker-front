import React from 'react';

import signIn from '../../static/css/signin/signin.module.css';

import KakaoLogin from '../../static/icon/kakao/ko/kakao_login_large_wide.png';

function SignIn() {
    return (
        <div className={signIn.container}>
            <div className={signIn.sign}>
                <div className={signIn.main}>
                    CAKER
                </div>
                <div className={signIn.sub}>
                    동네-카페-찾기
                </div>
            </div>
            <div className={signIn.signIn}>
                <div className={signIn.idWrapper}>
                    <input className={signIn.idPrepend} readOnly />
                    <input className={signIn.idInput} placeholder="전화번호 또는 이메일" />
                    <input className={signIn.idAppend} readOnly />
                </div>
                <div style={{height: '3vh'}} />
                <div className={signIn.idWrapper}>
                    <input className={signIn.idPrepend} readOnly />
                    <input type="password" className={signIn.idInput} placeholder="비밀번호" />
                    <input className={signIn.idAppend} value="a" readOnly />
                </div>
                <div style={{height: '4vh'}} />
                <div className={signIn.forgotPassword}>
                    비밀번호를 잊으셨나요?
                </div>
                <div style={{height: '3.25vh'}} />
                <div style={{color: "#333333", fontSize:"0.45em"}}>
                    ●
                </div>
                <div style={{height: '2.25vh'}} />
                <div style={{fontFamily:"WaitingfortheSunrise", fontSize: "1.95em", fontWeight: "bold"}}>
                    ENTER
                </div>
                <div style={{height: '8vh'}} />
                <div style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent:"center"}}>
                    <div style={{width: "10vw", fontFamily: "San Francisco", fontSize: "0.8em", color: "#D5D0C4"}}>또는</div>
                    <div style={{background: "#E8E6DF", width: "70vw", height: "0.2vh", borderRadius: "2px"}} />
                </div>
                <div style={{height: '1vh'}} />
                <img alt="" src={KakaoLogin} style={{width: "80vw"}} />
            </div>
        </div>
    );
}

export default SignIn;