import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import GeoTagSearch from '../geo_tag_search/GeoTagSearch';
import TagSearch from '../tag_search/TagSearch';
import TagSearchResult from '../tag_search_result/TagSearchResult';
import PostUpload from '../post_upload/PostUpload';
import MyPostList from '../my_post_list/MyPostList';
import Config from '../config/Config';

/* temp */
import Glass from '../../static/icon/magnifying-glass.svg';
import Maps from '../../static/icon/map-marker.svg';
import Notes from '../../static/icon/plus-black-symbol.svg';
import Cogs from '../../static/icon/cog-wheel-silhouette.svg';
import Books from '../../static/icon/reorder-option.svg';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import primary from '../../static/css/frame/primary.module.css';

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
                            <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([primary.primaryColor, primary.footerButton])} />
                        </Link>
                        <Link to="/postupload" className={primary.footerButtonWrapper} onClick={() => pageDidMount(true, true)}>
                            <img alt="" src={Notes} className={classNames([primary.primaryColor, primary.footerButton])} />
                        </Link>
                        <Link to="/mypostlist" className={primary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                            <img alt="" src={Books} className={classNames([primary.primaryColor, primary.footerButton])} />
                        </Link>
                        <Link to="/config" className={primary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                            <img alt="" src={Cogs} className={classNames([primary.primaryColor, primary.footerButton])} />
                        </Link>
                    </div>
                </div>
                <div className={primary.footerSide} />
            </div>
        </div>
    );
}

export default Primary;