import React from 'react';

import { Page, SIGN_IN } from '../../const/Constant';

import HandPointing from '../../static/icon/hand-pointing-upward.svg';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import signUp from '../../static/css/signup/signup.module.css';

type SignUpProps = {
    redirect: (page: Page) => void
}

function SignUp({ redirect }: SignUpProps) {
    return (
        <div className={classNames([signUp.container, index.fadeInFast])}>
            <div className={signUp.sign}>
                <div className={signUp.main}>
                    <img alt="" className={index.secondaryColor} src={HandPointing} style={{width: "11vw"}} onClick={() => redirect(SIGN_IN)} />
                </div>
                <div className={signUp.sub}>동네 카페를 찾아보세요!</div>
                <div className={signUp.description}>
                    마음에 드는 카페를 찾아보고 찾아가보세요<br/>
                    리뷰도 작성해보세요! 케이커
                </div>
            </div>
            <div className={signUp.signUp}>
                <div className={signUp.authWrapper}>
                    <input className={signUp.authPrepend} readOnly />
                    <input className={signUp.authInput} placeholder="이메일" />
                    <input className={signUp.authAppend} readOnly />
                </div>
                <div style={{ height: '2.75vh' }} />
                <div className={signUp.dot}>
                    ●
                </div>
                <div style={{ height: '2vh' }} />
                <div className={signUp.requestButton}>NEXT</div>
            </div>
        </div>
    );
}

export default SignUp;