import React, { useState } from 'react';

import { EMPTY_STRING, RESET_ICON, Page, FORGOT_PASSWORD } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import signIn from '../../static/css/signin/signin.module.css';

import EyeOpen from '../../static/icon/eye-open.svg';
import EyeClose from '../../static/icon/eye-with-a-diagonal-line-interface-symbol-for-invisibility.svg';
import KakaoLogin from '../../static/icon/kakao/ko/kakao_login_large_wide.png';

type SignInProps = {
    redirect: (page: Page) => void,
    setIsSigned: React.Dispatch<React.SetStateAction<boolean>>
}

function SignIn({ redirect, setIsSigned }: SignInProps) {
    const [uidInput, setUidInput] = useState(EMPTY_STRING);
    const [passwordInput, setPasswordInput] = useState(EMPTY_STRING);

    const [isWritten, setIsWritten] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);

    function changeUidInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === EMPTY_STRING) {
            setUidInput(EMPTY_STRING);
            setIsWritten(false);
        }
        else {
            if (!isWritten)
                setIsWritten(true);
                setUidInput(e.target.value);
        }
    }

    function changePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (isBlurred) {
            setPasswordInput(passwordInput !== EMPTY_STRING ? EMPTY_STRING : e.target.value);
            setIsBlurred(false);
        }
        else {
            setPasswordInput(e.target.value);
        }
    }

    function clearUidInput() {
        if (isWritten) {
            setUidInput(EMPTY_STRING);
            setIsWritten(false);
        }
    }

    return (
        <div className={classNames([signIn.container, index.fadeInFast])}>
            <div className={signIn.sign}>
                <div className={signIn.main}>
                    CAKER
                </div>
                <div className={signIn.sub}>
                    동네-카페-찾기
                </div>
            </div>
            <div className={signIn.signIn}>
                <div className={signIn.authWrapper}>
                    <input className={signIn.authPrepend} readOnly />
                    <input className={signIn.authInput} value={uidInput} onChange={(e) => changeUidInput(e)} placeholder="사용자 이름 또는 이메일" />
                    <input className={signIn.authAppend} value={isWritten ? RESET_ICON : EMPTY_STRING}
                        onClick={() => clearUidInput()} readOnly />
                </div>
                <div style={{ height: '3vh' }} />
                <div className={signIn.authWrapper}>
                    <input className={signIn.authPrepend} readOnly />
                    <input type={isVisible ? "text" : "password"} 
                        className={signIn.authInput} 
                        value={passwordInput} 
                        onBlur={() => setIsBlurred(true)}
                        onChange={(e) => changePasswordInput(e)} 
                        placeholder="비밀번호" />
                    <div className={signIn.authAppend} onClick={() => setIsVisible(!isVisible)}>
                        <div className={index.secondaryColor} style={{ content: isVisible ? "url(" + EyeClose + ")" : "url(" + EyeOpen + ")", width: "4.5vw" }} />
                    </div>
                </div>
                <div style={{ height: '4vh' }} />
                <div className={signIn.forgotPassword} onClick={() => redirect(FORGOT_PASSWORD)}>
                    비밀번호를 잊으셨나요?
                </div>
                <div style={{ height: '3.15vh' }} />
                <div className={signIn.dot}>
                    ●
                </div>
                <div style={{ height: '2.45vh' }} />
                <div className={signIn.signInButton}>
                    ENTER
                </div>
                <div style={{ height: '8vh' }} />
                <div className={signIn.separator}>
                    <div className={signIn.separatorComment}>
                        또는
                    </div>
                    <div className={signIn.separatorBar} />
                </div>
                <div style={{ height: '1vh' }} />
                <img alt="" src={KakaoLogin} style={{ width: "80vw" }} onClick={() => setIsSigned(true)} />
            </div>
        </div>
    );
}

export default SignIn;