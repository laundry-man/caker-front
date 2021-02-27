import React, { useRef, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';

import {
    EMPTY_STRING,
    Page,
    EMPTY_PAGE,
    ENTRANCE,
    GEO_TAG_SEARCH,
    TAG_SEARCH,
    TAG_SEARCH_RESULT,
    POST_UPLOAD,
    MY_POST_LIST,
    CONFIG
} from './const/Constant';

import Entrance from './dynamic/entrance/Entrance';
import GeoTagSearch from './dynamic/geotagsearch/GeoTagSearch';
import TagSearch from './dynamic/tagsearch/TagSearch';
import TagSearchResult from './dynamic/tagsearchresult/TagSearchResult';
import PostUpload from './dynamic/postupload/PostUpload';
import MyPostList from './dynamic/mypostlist/MyPostList';
import Config from './dynamic/config/Config';

import Glass from './static/icon/magnifying-glass.svg';
import Maps from './static/icon/map-marker.svg';
import Notes from './static/icon/plus-black-symbol.svg';
import Cogs from './static/icon/cog-wheel-silhouette.svg';
import Books from './static/icon/reorder-option.svg';

import classNames from 'classnames';
import index from './static/css/index.module.css';
import app from './static/css/app.module.css';

function App() {
    const [content, setContent] = useState(EMPTY_STRING);

    const [predecessor, setPredecessor] = useState<Page>(EMPTY_PAGE);

    const [isEntrance, setIsEntrance] = useState(false);
    const [isTagSearch, setIsTagSearch] = useState(false);
    const [isPostUpload, setIsPostUpload] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);
    const pageHistory = useHistory<Page>();

    function redirect(page: Page) {
        pageHistory.push(page);
    }

    function clearContent() {
        if (predecessor !== EMPTY_PAGE) {
            setContent(EMPTY_STRING);
            redirect(predecessor);
            setPredecessor(EMPTY_PAGE);
        }
    }

    function pageDidMount(page: Page) {
        if (content !== EMPTY_STRING)
            setContent(EMPTY_STRING);
        setIsEntrance(page === ENTRANCE);
        setIsTagSearch(page === POST_UPLOAD || page === TAG_SEARCH);
        setIsPostUpload(page === POST_UPLOAD);
    }

    return (
        <div className={classNames([!isPostUpload ? app.primary : app.secondary, index.fadeInSlow])}>
            <div className={app.header}>
                <div className={app.headerSide} />
                <div className={app.headerCenter}>
                    <div className={app.headerWrapper}>
                        <div className={!isPostUpload ? app.headerTitlePrimary : app.headerTitleSecondary}>
                            <div>CAKER</div>
                        </div>
                        <div className={!isPostUpload ? app.headerContentPrimary : app.headerContentSecondary}>
                            <div id="content" ref={contentRef} onClick={() => clearContent()}>
                                {content}
                            </div>
                        </div>
                    </div>
                    <div className={!isPostUpload ? app.headerBarPrimary : app.headerBarSecondary}>&nbsp;</div>
                </div>
                <div className={app.headerSide} />
            </div>
            <div className={app.body}>
                <div className={app.bodySide} />
                <div className={app.bodyCenter}>
                    <Switch>
                        <Route exact path={"/" + ENTRANCE}>
                            <Entrance 
                                pageDidMount={pageDidMount} 
                            />
                        </Route>
                        <Route exact path={"/" + GEO_TAG_SEARCH}>
                            <GeoTagSearch
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + TAG_SEARCH}>
                            <TagSearch
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + TAG_SEARCH_RESULT}>
                            <TagSearchResult
                                tag={content}
                                redirect={redirect}
                            />
                        </Route>
                        <Route exact path={"/" + POST_UPLOAD}>
                            <PostUpload
                                contentRef={contentRef}
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + MY_POST_LIST}>
                            <MyPostList 
                                pageDidMount={pageDidMount}
                            />
                        </Route>
                        <Route exact path={"/" + CONFIG}>
                            <Config 
                                pageDidMount={pageDidMount} 
                            />
                        </Route>
                    </Switch>
                </div>
                <div className={app.bodySide} />
            </div>
            <div className={app.footer}>
                <div className={app.footerSide} />
                <div className={app.footerCenter}>
                    <div className={!isPostUpload ? app.footerBarPrimary : app.footerBarSecondary}>&nbsp;</div>
                    <div className={app.footerWrapper}>
                        <Link to={isTagSearch ? GEO_TAG_SEARCH : TAG_SEARCH} className={app.footerButtonWrapper}>
                            <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, app.footerButton])} />
                        </Link>
                        <Link to={POST_UPLOAD} className={app.footerButtonWrapper}>
                            <img alt="" src={Notes} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, app.footerButton])} />
                        </Link>
                        <Link to={MY_POST_LIST} className={app.footerButtonWrapper}>
                            <img alt="" src={Books} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, app.footerButton])} />
                        </Link>
                        <Link to={CONFIG} className={app.footerButtonWrapper}>
                            <img alt="" src={Cogs} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, app.footerButton])} />
                        </Link>
                    </div>
                </div>
                <div className={app.footerSide} />
            </div>
        </div>
    );
}

export default App;