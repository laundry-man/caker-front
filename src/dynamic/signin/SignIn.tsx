import React from 'react';

import signIn from '../../static/css/signin/signin.module.css';

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
                <div style={{height: '3.5vh'}} />
                <div className={signIn.idWrapper}>
                    <input className={signIn.idPrepend} readOnly />
                    <input type="password" className={signIn.idInput} placeholder="비밀번호" />
                    <input className={signIn.idAppend} value="a" readOnly />
                </div>
            </div>
        </div>
    );
}

export default SignIn;