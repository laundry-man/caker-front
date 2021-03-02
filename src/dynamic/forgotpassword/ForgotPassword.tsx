import React from 'react';

import { Page, SIGN_IN } from '../../const/Constant';

import Padlock from '../../static/icon/padlock.svg';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import forgotPassword from '../../static/css/fotgotpassword/forgotPassword.module.css';

type ForgotPasswordProps = {
    redirect: (page: Page) => void
}

function ForgotPassword({ redirect }: ForgotPasswordProps) {
    return (
        <div className={classNames([forgotPassword.container, index.fadeInFast])}>
            <div className={forgotPassword.sign}>
                <img alt="" className={classNames([index.primaryColor, forgotPassword.main])} src={Padlock} onClick={() => redirect(SIGN_IN)} />
                <div className={forgotPassword.sub}>로그인에 문제가 있나요?</div>
                <div className={forgotPassword.description}>
                    사용자 이름 또는 이메일을 입력하면 다시 계정에<br/>
                    로그인할 수 있는 링크를 보내드립니다.
                </div>
            </div>
            <div className={forgotPassword.forgotPassword}>
                <div className={forgotPassword.authWrapper}>
                    <input className={forgotPassword.authPrepend} readOnly />
                    <input className={forgotPassword.authInput} placeholder="사용자 이름 또는 이메일" />
                    <input className={forgotPassword.authAppend} readOnly />
                </div>
                <div style={{ height: '2.75vh' }} />
                <div className={forgotPassword.dot}>
                    ●
                </div>
                <div style={{ height: '2vh' }} />
                <div className={forgotPassword.requestButton}>NEXT</div>
            </div>
        </div>
    );
}

export default ForgotPassword;