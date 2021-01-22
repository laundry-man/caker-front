import React, { useRef, useState } from 'react';

import { Switch, Route, Link, useHistory } from 'react-router-dom';

import { EMPTY_STRING } from './const/Constant';

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
  const [content, setContent] = useState(EMPTY_STRING);
  const [predecessor, setPredecessor] = useState(EMPTY_STRING);
  const [search, setSearch] = useState(false);
  const [upload, setUpload] = useState(false);

  const history = useHistory();
  const redirect = (path: string) => history.push(path);

  const contentRef = useRef<HTMLDivElement>(null);

  const resetContent = () => {
    if (predecessor !== EMPTY_STRING) {
      setContent(EMPTY_STRING);
      redirect(predecessor);
      setPredecessor(EMPTY_STRING);
    }
  }

  const changeBackground = (upload: boolean) => {
    document.body.style.background = upload ? '#333333' : '#F2F1ED';
  }

  const pageDidMount = (search: boolean, upload: boolean = false) => {
    if (content !== EMPTY_STRING)
      setContent(EMPTY_STRING);
    changeBackground(upload);
    setSearch(search);
    setUpload(upload);
  }

  function Inverse() {
    return (
      <div className="inverse fade-in-slow">
        <div className="caker-header">
          <div className="caker-header-side"></div>
          <div className="caker-header-center">
            <div className="caker-header-wrapper">
              <div className="inverse-header-title">
                <div>CAKER</div>
              </div>
              <div className="inverse-header-content">
                <div id="content" ref={contentRef} onClick={() => resetContent()}>{content}</div>
              </div>
            </div>
            <div className="inverse-header-bar">&nbsp;</div>
          </div>
          <div className="caker-header-side"></div>
        </div>
        <div className="caker-body">
          <div className="caker-body-side"></div>
          <div className="caker-body-center">
            <Switch>
              <Route exact path="/search">
                <Search redirect={redirect}
                  setContent={setContent}
                  setPredecessor={setPredecessor}></Search>
              </Route>
              <Route exact path="/main">
                <Main redirect={redirect}
                  setContent={setContent}
                  setPredecessor={setPredecessor}></Main>
              </Route>
              <Route exact path="/result">
                <Result tag={content}
                  redirect={redirect}></Result>
              </Route>
              <Route exact path="/upload">
                <Upload contentRef={contentRef}
                  redirect={redirect}
                  setPredecessor={setPredecessor}></Upload>
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
            <div className="inverse-footer-bar">&nbsp;</div>
            <div className="caker-footer-wrapper">
              <Link to={search ? "/main" : "/search"} className="caker-footer-button-wrapper" onClick={() => pageDidMount(!search)}>
                <img alt="" src={search ? Maps : Glass} className="inverse-color caker-footer-button"></img>
              </Link>
              <Link to="/upload" className="caker-footer-button-wrapper" onClick={() => pageDidMount(true, true)}>
                <img alt="" src={Notes} className="inverse-color caker-footer-button"></img>
              </Link>
              <Link to="/post" className="caker-footer-button-wrapper" onClick={() => pageDidMount(true)}>
                <img alt="" src={Books} className="inverse-color caker-footer-button"></img>
              </Link>
              <Link to="/setting" className="caker-footer-button-wrapper" onClick={() => pageDidMount(true)}>
                <img alt="" src={Cogs} className="inverse-color caker-footer-button"></img>
              </Link>
            </div>
          </div>
          <div className="caker-footer-side"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {upload ? <Inverse></Inverse> :
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
                  <Search redirect={redirect}
                    setContent={setContent}
                    setPredecessor={setPredecessor}></Search>
                </Route>
                <Route exact path="/main">
                  <Main redirect={redirect}
                    setContent={setContent}
                    setPredecessor={setPredecessor}></Main>
                </Route>
                <Route exact path="/result">
                  <Result tag={content}
                    redirect={redirect}></Result>
                </Route>
                <Route exact path="/upload">
                  <Upload 
                  contentRef={contentRef}
                  redirect={redirect}
                    setPredecessor={setPredecessor}></Upload>
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
                <Link to={search ? "/main" : "/search"} className="caker-footer-button-wrapper" onClick={() => pageDidMount(!search)}>
                  <img alt="" src={search ? Maps : Glass} className="icon-color caker-footer-button"></img>
                </Link>
                <Link to="/upload" className="caker-footer-button-wrapper" onClick={() => pageDidMount(true, true)}>
                  <img alt="" src={Notes} className="icon-color caker-footer-button"></img>
                </Link>
                <Link to="/post" className="caker-footer-button-wrapper" onClick={() => pageDidMount(true)}>
                  <img alt="" src={Books} className="icon-color caker-footer-button"></img>
                </Link>
                <Link to="/setting" className="caker-footer-button-wrapper" onClick={() => pageDidMount(true)}>
                  <img alt="" src={Cogs} className="icon-color caker-footer-button"></img>
                </Link>
              </div>
            </div>
            <div className="caker-footer-side"></div>
          </div>
        </div>
      }
    </>
  );
};

export default App;