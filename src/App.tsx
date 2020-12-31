import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Search from './dynamic/Search';
import Main from './dynamic/Main';
import Upload from './dynamic/Upload';
import List from './dynamic/List';
import Settings from './dynamic/Settings';

import Glass from './static/icon/magnifying-glass.svg';
import Maps from './static/icon/map-marker.svg';
import Notes from './static/icon/plus-black-symbol.svg';
import Cogs from './static/icon/cog-wheel-silhouette.svg';
import Books from './static/icon/reorder-option.svg';

import './static/css/app.css';
import './static/css/header.css';
import './static/css/body.css';
import './static/css/footer.css';

function App() {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <BrowserRouter>
      <div className="app fade-in-slow">
        <div className="caker-header">
          <div className="caker-header-side"></div>
          <div className="caker-header-center">
            <div className="caker-header-wrapper">
              <div className="caker-header-title">
                <span>CAKER</span>
              </div>
              <div className="caker-header-content">
                <span>#브라운핸즈구로</span>
              </div>
            </div>
            <div className="caker-header-bar">&nbsp;</div>
          </div>
          <div className="caker-header-side"></div>
        </div>
        <div className="caker-body">
          <div className="caker-body-side"></div>
          <div className="caker-body-center">
            <Switch>
              <Route exact path="/search"><Search></Search></Route>
              <Route exact path="/main"><Main></Main></Route>
              <Route exact path="/upload"><Upload></Upload></Route>
              <Route exact path="/list"><List></List></Route>
              <Route exact path="/settings"><Settings></Settings></Route>
            </Switch>
          </div>
          <div className="caker-body-side"></div>
        </div>
        <div className="caker-footer">
          <div className="caker-footer-side"></div>
          <div className="caker-footer-center">
            <div className="caker-footer-bar">&nbsp;</div>
            <div className="caker-footer-wrapper">
              {isSearch ? 
                <Link to="/main" className="caker-footer-button-wrapper" onClick={() => setIsSearch(false)}>
                  <img alt="" src={Maps} className="icon-color caker-footer-button"></img>
                </Link> : 
                <Link to="/search" className="caker-footer-button-wrapper" onClick={() => setIsSearch(true)}>
                  <img alt="" src={Glass} className="icon-color caker-footer-button"></img>
                </Link>
              }
              <Link to="/upload" className="caker-footer-button-wrapper" onClick={() => setIsSearch(true)}>
                <img alt="" src={Notes} className="icon-color caker-footer-button"></img>
              </Link>
              <Link to="/list" className="caker-footer-button-wrapper" onClick={() => setIsSearch(true)}>
                <img alt="" src={Books} className="icon-color caker-footer-button"></img>
              </Link>
              <Link to="/settings" className="caker-footer-button-wrapper" onClick={() => setIsSearch(true)}>
                <img alt="" src={Cogs} className="icon-color caker-footer-button"></img>
              </Link>
            </div>
          </div>
          <div className="caker-footer-side"></div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;