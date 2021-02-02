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
import secondary from '../../static/css/frame/secondary.module.css';

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
                            <img alt="" src={isTagSearch ? Maps : Glass} className={classNames([secondary.secondaryColor, secondary.footerButton])} />
                        </Link>
                        <Link to="/postupload" className={secondary.footerButtonWrapper} onClick={() => pageDidMount(true, true)}>
                            <img alt="" src={Notes} className={classNames([secondary.secondaryColor, secondary.footerButton])} />
                        </Link>
                        <Link to="/mypostlist" className={secondary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                            <img alt="" src={Books} className={classNames([secondary.secondaryColor, secondary.footerButton])} />
                        </Link>
                        <Link to="/config" className={secondary.footerButtonWrapper} onClick={() => pageDidMount(true)}>
                            <img alt="" src={Cogs} className={classNames([secondary.secondaryColor, secondary.footerButton])} />
                        </Link>
                    </div>
                </div>
                <div className={secondary.footerSide} />
            </div>
        </div>
    );
}

export default Secondary;