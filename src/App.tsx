import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';

import { EMPTY_STRING } from './const/Constant';

import GeoTagSearch from './dynamic/geotagsearch/GeoTagSearch';
import TagSearch from './dynamic/tagsearch/TagSearch';
import TagSearchResult from './dynamic/tagsearchresult/TagSearchResult';
import PostUpload from './dynamic/postupload/PostUpload';
import MyPostList from './dynamic/mypostlist/MyPostList';
import Config from './dynamic/config/Config';

/* temp */
import Glass from './static/icon/magnifying-glass.svg';
import Maps from './static/icon/map-marker.svg';
import Notes from './static/icon/plus-black-symbol.svg';
import Cogs from './static/icon/cog-wheel-silhouette.svg';
import Books from './static/icon/reorder-option.svg';

import classNames from 'classnames';
import index from './static/css/index.module.css';
import primary from './static/css/primary.module.css';
import secondary from './static/css/secondary.module.css';

function App() {
  const [content, setContent] = useState(EMPTY_STRING);
  const [predecessor, setPredecessor] = useState(EMPTY_STRING);

  const [isTagSearch, setIsTagSearch] = useState(false);
  const [isPostUpload, setIsPostUpload] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  function redirect(path: string) {
    history.push(path);
  }

  function clearContent() {
    if (predecessor !== EMPTY_STRING) {
      setContent(EMPTY_STRING);
      redirect(predecessor);
      setPredecessor(EMPTY_STRING);
    }
  }

  function changeBackground(isPostUpload: boolean) {
    document.body.style.background =
      isPostUpload ? '#333333' : '#F2F1ED';
  }

  function pageDidMount(isTagSearch: boolean, isPostUpload: boolean = false) {
    if (content !== EMPTY_STRING)
      setContent(EMPTY_STRING);
    changeBackground(isPostUpload);
    setIsTagSearch(isTagSearch);
    setIsPostUpload(isPostUpload);
  }


  return (
    <>
      {isPostUpload ?
        <Secondary
          content={content}
          isTagSearch={isTagSearch}
          contentRef={contentRef}
          setContent={setContent}
          setPredecessor={setPredecessor}
          redirect={redirect}
          clearContent={clearContent}
          pageDidMount={pageDidMount}
        /> :
        <Primary
          content={content}
          isTagSearch={isTagSearch}
          contentRef={contentRef}
          setContent={setContent}
          setPredecessor={setPredecessor}
          redirect={redirect}
          clearContent={clearContent}
          pageDidMount={pageDidMount}
        />
      }
    </>
  );
};

type PrimaryProps = {
  content: string,
  isTagSearch: boolean,
  contentRef: React.RefObject<HTMLDivElement>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setPredecessor: React.Dispatch<React.SetStateAction<string>>,
  redirect: (path: string) => void,
  clearContent: () => void,
  pageDidMount: (isTagSearch: boolean, isPostUpload?: boolean) => void
}

function Primary({
  content,
  isTagSearch,
  contentRef,
  setContent,
  setPredecessor,
  redirect,
  clearContent,
  pageDidMount }: PrimaryProps) {

  return (
      <div className={classNames([primary.primary, index.fadeInSlow])}>
          <div className={primary.header}>
              <div className={primary.headerSide} />
              <div className={primary.headerCenter}>
                  <div className={primary.headerWrapper}>
                      <div className={primary.headerTitle}>
                          <div>CAKER</div>
                      </div>
                      <div className={primary.headerContent}>
                          <div id="content" ref={contentRef} onClick={() => clearContent()}>
                              {content}
                          </div>
                      </div>
                  </div>
                  <div className={primary.headerBar}>&nbsp;</div>
              </div>
              <div className={primary.headerSide} />
          </div>
          <div className={primary.body}>
              <div className={primary.bodySide} />
              <div className={primary.bodyCenter}>
                  <Switch>
                      <Route exact path="/tagsearch">
                          <TagSearch
                              redirect={redirect}
                              setContent={setContent}
                              setPredecessor={setPredecessor}
                          />
                      </Route>
                      <Route exact path="/geotagsearch">
                          <GeoTagSearch
                              redirect={redirect}
                              setContent={setContent}
                              setPredecessor={setPredecessor}
                          />
                      </Route>
                      <Route exact path="/tagsearchresult">
                          <TagSearchResult
                              tag={content}
                              redirect={redirect}
                          />
                      </Route>
                      <Route exact path="/postupload">
                          <PostUpload
                              contentRef={contentRef}
                              redirect={redirect}
                              setPredecessor={setPredecessor}
                          />
                      </Route>
                      <Route exact path="/mypostlist">
                          <MyPostList />
                      </Route>
                      <Route exact path="/config">
                          <Config />
                      </Route>
                  </Switch>
              </div>
              <div className={primary.bodySide} />
          </div>
          <div className={primary.footer}>
              <div className={primary.footerSide} />
              <div className={primary.footerCenter}>
                  <div className={primary.footerBar}>&nbsp;</div>
                  <div className={primary.footerWrapper}>
                      <Link to={isTagSearch ? "/geotagsearch" : "/tagsearch"} className={primary.footerButtonWrapper} onClick={() => pageDidMount(!isTagSearch)}>
                          <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([index.primaryColor, primary.footerButton])} />
                      </Link>
                      <Link to="/postupload" className={primary.footerButtonWrapper} onClick={() => pageDidMount(true, true)}>
                          <img alt="" src={Notes} className={classNames([index.primaryColor, primary.footerButton])} />
                      </Link>
                      <Link to="/mypostlist" className={primary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                          <img alt="" src={Books} className={classNames([index.primaryColor, primary.footerButton])} />
                      </Link>
                      <Link to="/config" className={primary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                          <img alt="" src={Cogs} className={classNames([index.primaryColor, primary.footerButton])} />
                      </Link>
                  </div>
              </div>
              <div className={primary.footerSide} />
          </div>
      </div>
  );
}

type SecondaryProps = {
  content: string,
  isTagSearch: boolean,
  contentRef: React.RefObject<HTMLDivElement>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setPredecessor: React.Dispatch<React.SetStateAction<string>>,
  redirect: (path: string) => void,
  clearContent: () => void,
  pageDidMount: (isTagSearch: boolean, isPostUpload?: boolean) => void
}

function Secondary({
  content,
  isTagSearch,
  contentRef,
  setContent,
  setPredecessor,
  redirect,
  clearContent,
  pageDidMount }: SecondaryProps) {

  return (
      <div className={classNames([secondary.secondary, index.fadeInSlow])}>
          <div className={secondary.header}>
              <div className={secondary.headerSide} />
              <div className={secondary.headerCenter}>
                  <div className={secondary.headerWrapper}>
                      <div className={secondary.headerTitle}>
                          <div>CAKER</div>
                      </div>
                      <div className={secondary.headerContent}>
                          <div id="content" ref={contentRef} onClick={() => clearContent()}>
                              {content}
                          </div>
                      </div>
                  </div>
                  <div className={secondary.headerBar}>&nbsp;</div>
              </div>
              <div className={secondary.headerSide} />
          </div>
          <div className={secondary.body}>
              <div className={secondary.bodySide}></div>
              <div className={secondary.bodyCenter}>
                  <Switch>
                      <Route exact path="/tagsearch">
                          <TagSearch
                              redirect={redirect}
                              setContent={setContent}
                              setPredecessor={setPredecessor}
                          />
                      </Route>
                      <Route exact path="/geotagsearch">
                          <GeoTagSearch 
                              redirect={redirect}
                              setContent={setContent}
                              setPredecessor={setPredecessor} 
                          />
                      </Route>
                      <Route exact path="/tagsearchresult">
                          <TagSearchResult
                              tag={content}
                              redirect={redirect}
                          />
                      </Route>
                      <Route exact path="/postupload">
                          <PostUpload
                              contentRef={contentRef}
                              redirect={redirect}
                              setPredecessor={setPredecessor}
                          />
                      </Route>
                      <Route exact path="/mypostlist">
                          <MyPostList />
                      </Route>
                      <Route exact path="/config">
                          <Config />
                      </Route>
                  </Switch>
              </div>
              <div className={secondary.bodySide} />
          </div>
          <div className={secondary.footer}>
              <div className={secondary.footerSide} />
              <div className={secondary.footerCenter}>
                  <div className={secondary.footerBar}>&nbsp;</div>
                  <div className={secondary.footerWrapper}>
                      <Link to={isTagSearch ? "/geotagsearch" : "/tagsearch"} className={secondary.footerButtonWrapper} onClick={() => pageDidMount(!isTagSearch)}>
                          <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([index.secondaryColor, secondary.footerButton])} />
                      </Link>
                      <Link to="/postupload" className={secondary.footerButtonWrapper} onClick={() => pageDidMount(true, true)}>
                          <img alt="" src={Notes} className={classNames([index.secondaryColor, secondary.footerButton])} />
                      </Link>
                      <Link to="/mypostlist" className={secondary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                          <img alt="" src={Books} className={classNames([index.secondaryColor, secondary.footerButton])} />
                      </Link>
                      <Link to="/config" className={secondary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                          <img alt="" src={Cogs} className={classNames([index.secondaryColor, secondary.footerButton])} />
                      </Link>
                  </div>
              </div>
              <div className={secondary.footerSide} />
          </div>
      </div>
  );
}

export default App;