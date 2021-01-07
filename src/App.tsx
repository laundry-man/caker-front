import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Search from './dynamic/Search';
import Main from './dynamic/Main';
import Result from './dynamic/Result';
import Upload from './dynamic/Upload';
import Post from './dynamic/Post';
import Setting from './dynamic/Setting';

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
  const [search, setSearch] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [writing, setWriting] = useState(false);
  const [content, setContent] = useState('🍰');
  const [predecessor, setPredecessor] = useState("");

  const resetContent = () => {
    if (!writing) {
      setContent('🍰');
      setCancel(!cancel);
    }
  }

  const movePage = (search: boolean) => {
    if (content !== '🍰')
      setContent('🍰');
    setSearch(search);
    setWriting(false);
  }

  return (
    <BrowserRouter>
      <div className="app fade-in-slow">
        <div className="caker-header">
          <div className="caker-header-side"></div>
          <div className="caker-header-center">
            <div className="caker-header-wrapper">
              <div className="caker-header-title">
                <div>CAKER</div>
              </div>
              <div className="caker-header-content">
                <div onClick={() => resetContent()}>{content}</div>
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
              <Route exact path="/search">
                <Search cancel={cancel} 
                        writing={writing} 
                        setContent={setContent} 
                        setWriting={setWriting} 
                        setPredecessor={setPredecessor}></Search>
              </Route>
              <Route exact path="/main">
                <Main setContent={setContent} 
                      setPredecessor={setPredecessor}></Main>
              </Route>
              <Route exact path="/result">
                <Result tag={content}></Result>
              </Route>
              <Route exact path="/upload">
                <Upload></Upload>
              </Route>
              <Route exact path="/post">
                <Post></Post>
              </Route>
              <Route exact path="/setting">
                <Setting></Setting>
              </Route>
            </Switch>
          </div>
          <div className="caker-body-side"></div>
        </div>
        <div className="caker-footer">
          <div className="caker-footer-side"></div>
          <div className="caker-footer-center">
            <div className="caker-footer-bar">&nbsp;</div>
            <div className="caker-footer-wrapper">
              {search ?
                <Link to="/main" className="caker-footer-button-wrapper" onClick={() => movePage(false)}>
                  <img alt="" src={Maps} className="icon-color caker-footer-button"></img>
                </Link> :
                <Link to="/search" className="caker-footer-button-wrapper" onClick={() => movePage(true)}>
                  <img alt="" src={Glass} className="icon-color caker-footer-button"></img>
                </Link>
              }
              <Link to="/upload" className="caker-footer-button-wrapper" onClick={() => movePage(true)}>
                <img alt="" src={Notes} className="icon-color caker-footer-button"></img>
              </Link>
              <Link to="/post" className="caker-footer-button-wrapper" onClick={() => movePage(true)}>
                <img alt="" src={Books} className="icon-color caker-footer-button"></img>
              </Link>
              <Link to="/setting" className="caker-footer-button-wrapper" onClick={() => movePage(true)}>
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