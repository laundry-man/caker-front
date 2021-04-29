import React, { useRef, useState, useEffect } from 'react';

import { Switch, Route, Link, useHistory } from 'react-router-dom';

import {
    EMPTY_STRING,
    Page,
    EMPTY_PAGE,
    GEO_TAG_SEARCH,
    TAG_SEARCH,
    TAG_SEARCH_RESULT,
    POST_UPLOAD,
    MY_POST_LIST,
    CONFIG,
    PROFILE
} from '../const/Constant';

import GeoTagSearch from './geotagsearch/GeoTagSearch';
import TagSearch from './tagsearch/TagSearch';
import TagSearchResult from './tagsearchresult/TagSearchResult';
import PostUpload from './postupload/PostUpload';
import MyPostList from './mypostlist/MyPostList';
import Profile from './profile/Profile';
import Config from './config/Config';

import Glass from '../static/icon/magnifying-glass.svg';
import Maps from '../static/icon/map-marker.svg';
import Notes from '../static/icon/plus-black-symbol.svg';
import Cogs from '../static/icon/cog-wheel-silhouette.svg';
import Books from '../static/icon/reorder-option.svg';

import classNames from 'classnames';
import index from '../static/css/index.module.css';
import frame from '../static/css/frame.module.css';

function Frame() {
    const [content, setContent] = useState(EMPTY_STRING);

    const [predecessor, setPredecessor] = useState<Page>(EMPTY_PAGE);

    const [isTagSearch, setIsTagSearch] = useState(false);
    const [isPostUpload, setIsPostUpload] = useState(false);

    const pageHistory = useHistory<Page>();

    const redirect = (page: Page) => pageHistory.push(page);

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
        setIsTagSearch(page === POST_UPLOAD || page === TAG_SEARCH);
        setIsPostUpload(page === POST_UPLOAD);
    }

    return (
        <div className={classNames([!isPostUpload ? frame.primary : frame.secondary, index.fadeInSlow])}>
            <div className={frame.header}>
                <div className={frame.headerSide} />
                <div className={frame.headerCenter}>
                    <div className={frame.headerWrapper}>
                        <div className={!isPostUpload ? frame.headerTitlePrimary : frame.headerTitleSecondary}>
                            <div>CAKER</div>
                        </div>
                        <div className={!isPostUpload ? frame.headerContentPrimary : frame.headerContentSecondary}>
                            <div onClick={() => clearContent()}>
                                {content}
                            </div>
                        </div>
                    </div>
                    <div className={!isPostUpload ? frame.headerBarPrimary : frame.headerBarSecondary}>&nbsp;</div>
                </div>
                <div className={frame.headerSide} />
            </div>
            <div className={frame.body}>
                <div className={frame.bodySide} />
                <div className={frame.bodyCenter}>
                    <Switch>
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
                                pageDidMount={pageDidMount}
                            />
                        </Route>
                        <Route exact path={"/" + MY_POST_LIST}>
                            <MyPostList 
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + PROFILE}>
                            <Profile 
                                pageDidMount={pageDidMount}
                                redirect={redirect}
                                setContent={setContent}
                                setPredecessor={setPredecessor}
                            />
                        </Route>
                        <Route exact path={"/" + CONFIG}>
                            <Config 
                                pageDidMount={pageDidMount} 
                            />
                        </Route>
                    </Switch>
                </div>
                <div className={frame.bodySide} />
            </div>
            <div className={frame.footer}>
                <div className={frame.footerSide} />
                <div className={frame.footerCenter}>
                    <div className={!isPostUpload ? frame.footerBarPrimary : frame.footerBarSecondary}>&nbsp;</div>
                    <div className={frame.footerWrapper}>
                        <Link to={isTagSearch ? GEO_TAG_SEARCH : TAG_SEARCH} className={frame.footerButtonWrapper}>
                            <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                        <Link to={POST_UPLOAD} className={frame.footerButtonWrapper}>
                            <img alt="" src={Notes} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                        <Link to={PROFILE} className={frame.footerButtonWrapper}>
                            <img alt="" src={Books} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                        <Link to={CONFIG} className={frame.footerButtonWrapper}>
                            <img alt="" src={Cogs} className={classNames([!isPostUpload ? index.primaryColor : index.secondaryColor, frame.footerButton])} />
                        </Link>
                    </div>
                </div>
                <div className={frame.footerSide} />
            </div>
            <div className={frame.bottom} />
        </div>
    );
}

export default Frame;