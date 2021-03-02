import React, { useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import { Page, SIGN_IN, SIGN_UP, FORGOT_PASSWORD } from '../const/Constant';

import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import ForgotPassword from './forgotpassword/ForgotPassword';

import classNames from 'classnames';
import index from '../static/css/index.module.css';
import entrance from '../static/css/entrance.module.css';

type EntranceProps = {
    setIsSigned: React.Dispatch<React.SetStateAction<boolean>>
}

function Entrance({ setIsSigned }: EntranceProps) {
    const [currentPage, setCurrentPage] = useState<Page>(SIGN_IN);
    const pageHistory = useHistory<Page>();

    const redirect = (page: Page) => {
        setCurrentPage(page);
        pageHistory.push(page);
    }

    return (
        <div className={entrance.primary}>
            <div className={entrance.header}>
                <div className={entrance.headerSide} />
                <div className={entrance.headerCenter}>
                    <div className={entrance.headerWrapper}>
                        &nbsp;
                    </div>
                </div>
                <div className={entrance.headerSide} />
            </div>
            <div className={entrance.body}>
                <div className={entrance.bodySide} />
                <div className={entrance.bodyCenter}>
                    <Switch>
                        <Route exact path={"/" + SIGN_IN}>
                            <SignIn redirect={redirect} />
                        </Route>
                        <Route exact path={"/" + SIGN_UP}>
                            <SignUp redirect={redirect} />
                        </Route>
                        <Route exact path={"/" + FORGOT_PASSWORD}>
                            <ForgotPassword redirect={redirect} />
                        </Route>
                    </Switch>
                </div>
                <div className={entrance.bodySide} />
            </div>
            <div className={entrance.footer}>
                <div className={entrance.footerSide} />
                <div className={entrance.footerCenter}>
                    <div className={entrance.footerWrapper}>
                        <div className={entrance.footerBarTop}>
                            {currentPage === SIGN_IN ?
                                <div key={0} className={classNames([entrance.footerContent, index.fadeInSlow])} onClick={() => redirect(SIGN_UP)}>
                                    새로 가입하기
                                </div> :
                                <div key={1} className={classNames([entrance.footerContent, index.fadeInSlow])} onClick={() => redirect(SIGN_IN)}>
                                    로그인으로 돌아가기
                                </div>
                            }
                        </div>
                        <div className={entrance.footerBarBottom}>&nbsp;</div>
                    </div>
                </div>
                <div className={entrance.footerSide} />
            </div>
        </div>
    );
}

export default Entrance;