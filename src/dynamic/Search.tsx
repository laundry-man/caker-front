import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Glass from '../static/icon/magnifying-glass.svg';
import Notes from '../static/icon/plus-black-symbol.svg';
import Cogs from '../static/icon/cog-wheel-silhouette.svg';
import Books from '../static/icon/reorder-option.svg';

function Search() {
    return (
        <div className="app fade-in-app">
            <div className="caker-header">
                <div className="caker-header-side"></div>
                <div className="caker-header-center">
                    <div className="caker-header-wrapper">
                        <div className="caker-header-title">
                            <span>CAKER</span>
                        </div>
                        <div className="caker-header-content">
                            <span>SEARCH</span>
                        </div>
                    </div>
                    <div className="caker-header-bar">&nbsp;</div>
                </div>
                <div className="caker-header-side"></div>
            </div>
            <div className="caker-body">
                <div className="caker-body-side"></div>
                <div className="caker-body-center">
                </div>
                <div className="caker-body-side"></div>
            </div>
            <div className="caker-footer">
                <div className="caker-footer-side"></div>
                <div className="caker-footer-center">
                    <div className="caker-footer-bar">&nbsp;</div>
                    <div className="caker-footer-wrapper">
                        <Link to="/" className="caker-footer-button-wrapper">
                            <img alt="" src={Glass} className="icon-color caker-footer-button"></img>
                        </Link>
                        <Link to="/upload" className="caker-footer-button-wrapper">
                            <img alt="" src={Notes} className="icon-color caker-footer-button"></img>
                        </Link>
                        <Link to="/list" className="caker-footer-button-wrapper">
                            <img alt="" src={Books} className="icon-color caker-footer-button"></img>
                        </Link>
                        <Link to="/settings" className="caker-footer-button-wrapper">
                            <img alt="" src={Cogs} className="icon-color caker-footer-button"></img>
                        </Link>
                    </div>
                </div>
                <div className="caker-footer-side"></div>
            </div>
        </div>
    );
}

export default Search;