import React, { useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import { Page, SIGN_IN, SIGN_UP } from '../const/Constant';

import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';

import entrance from '../static/css/entrance.module.css';

type EntranceProps = {
    setIsSigned: React.Dispatch<React.SetStateAction<boolean>>
}

function Entrance({ setIsSigned }: EntranceProps) {
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
                            <SignIn />
                        </Route>
                        <Route exact path={"/" + SIGN_UP}>
                            <SignUp />
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
                            <div className={entrance.footerContent}>
                                새로 가입하기
                            </div>
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