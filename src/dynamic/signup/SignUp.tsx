import React from 'react';

import { Page, SIGN_IN } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import signUp from '../../static/css/signup/signup.module.css';

type SignUpProps = {
    redirect: (page: Page) => void
}

function SignUp({ redirect }: SignUpProps) {
    return (
        <div className={classNames([signUp.container, index.fadeInSlow])}>
            <div onClick={() => redirect(SIGN_IN)}>SIGN-UP</div>
        </div>
    );
}

export default SignUp;