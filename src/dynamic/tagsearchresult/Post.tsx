import React, { useEffect, useState } from 'react';

import { Page,
         MY_POST_LIST,
         EMPTY_STRING, 
         COMMENT_MAX_WIDTH, 
         A_PIECE_OF_CAKE, 
         TWO_PIECES_OF_CAKE, 
         THREE_PIECES_OF_CAKE } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import post from '../../static/css/tagsearchresult/post.module.css';

import Hammer from '../../static/icon/legal-hammer.svg';
import FilledHeart from '../../static/icon/heart-shape-silhouette.svg';
import EmptyHeart from '../../static/icon/heart-shape-outline.svg';

type PostType = {
    isMine: boolean,
    isLiked: boolean,
    comment: string,
    cakeRating: number,
    theNumberOfLike: number,
    imagePathList: string[]
};

type PostProps = {
    postProp: PostType,
    redirect: (page: Page) => void
};

function Post({ postProp, redirect }: PostProps) {

    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < postProp.imagePathList.length; i++)
            _active.push(i === 0 ? true : false);
        return _active;
    })());

    function getNextView() {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    }

    return (
        <div>
            {active.map((active, key) => {
                if (active) {
                    return (
                        <ActiveView
                            postIndex={key} 
                            postProp={postProp}
                            getNextView={getNextView}
                            redirect={redirect}
                        />
                    );
                }
                return <div />;
            })}
        </div>
    );
}

type ActiveViewProps = {
    postIndex: number
    postProp: PostType,
    getNextView: () => void,
    redirect: (page: Page) => void
};

function ActiveView({ 
    postIndex,
    postProp, 
    getNextView,
    redirect }: ActiveViewProps) {

    const isComment: boolean = postIndex === 1;

    // 서버 상태 갱신을 어디서 진행할지 결정 필요.
    const [isLiked, setIsLiked] = useState(postProp.isLiked);
    const [theNumberOfLike, setTheNumberOfLike] = useState(postProp.theNumberOfLike);

    // 해당 컴포넌트 고유 상태
    const [isDeleted, setIsDeleted] = useState(false);
    const [splitComment, setSplitComment] = useState<string[]>([]);

    function assignComment() {
        setSplitComment(splitCommentByApproximateWidth(postProp.comment));
    }
    
    function splitCommentByApproximateWidth(comment: string) {
        let split: string[] = [];
        let width: number = 0;
        let line: string = EMPTY_STRING;
        for (let i = 0, j = 0; (j = comment.charCodeAt(i)) && split.length < 3; i++) {
            const charWidth: number = j >> 11 ? 3 : j >> 7 ? 3 : 1.75;
            if (Math.ceil(width + charWidth) > COMMENT_MAX_WIDTH) {
                split.push(line);
                line = comment[i];
                width = charWidth;
            } else {
                width += charWidth;
                line += comment[i];
            }
        }
        if (split.length < 3 && line !== EMPTY_STRING)
            split.push(line);
        return split;
    }
    
    function toggleLikeState() {
        setTheNumberOfLike(isLiked ? theNumberOfLike - 1 : theNumberOfLike + 1);
        setIsLiked(!isLiked);
    }
  
    useEffect(() => {
        if (isComment)
            assignComment();
    }, []);

    return (
        <div className={classNames([post.image, index.fadeInFast])}
            style={{ 
                height: isDeleted ? '0' : '80vw', 
                opacity: isDeleted ? 0 : 1,
                marginBottom: isDeleted ? '0' : '1vh', 
                backgroundImage: 'url(' + postProp.imagePathList[postIndex] + ')'}}>
            {isComment ?
                <CommentView
                    isMine={postProp.isMine}
                    isLiked={isLiked}
                    isDeleted={isDeleted}
                    theNumberOfLike={theNumberOfLike}
                    cakeRating={postProp.cakeRating}
                    splitComment={splitComment}
                    getNextView={getNextView}
                    toggleLikeState={toggleLikeState}
                    setIsDeleted={setIsDeleted}
                    redirect={redirect}
                /> :
                <div style={{ width: '80vw', height: '80vw', borderRadius: '5px' }}
                    onClick={() => getNextView()} />
            }
        </div>
    );
}

type CommentViewProps = {
    isMine: boolean,
    isLiked: boolean,
    isDeleted: boolean,
    theNumberOfLike: number,
    cakeRating: number,
    splitComment: string[],
    getNextView: () => void,
    toggleLikeState: () => void,
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>,
    redirect: (page: Page) => void
};

function CommentView({
    isMine,
    isLiked,
    isDeleted,
    theNumberOfLike,
    cakeRating,
    splitComment,
    getNextView,
    toggleLikeState,
    setIsDeleted,
    redirect }: CommentViewProps) {

    const [viewToggle, setViewToggle] = useState(false);
    const [reportViewToggle, setReportViewToggle] = useState(false);
    const [emailViewToggle, setEmailViewToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);
    
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    function deletePost(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();

        if (deleteToggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setIsDeleted(true);
        }
        else {
            setDeleteToggle(true);
            setTimer(
                setTimeout(() => {
                    setDeleteToggle(false);
                }, 5000)
            );
        }
    }

    function toggleView(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();

        setDeleteToggle(false);

        if (reportViewToggle) {
            setReportViewToggle(false);
        }
        else if (emailViewToggle) {
            setEmailViewToggle(false);
        }
        else {
            setViewToggle(!viewToggle);
        }
    }

    return (
        <div className={post.comment} 
            style={{
                display: isDeleted ? 'none' : 'block', 
                opacity: isDeleted ? 0 : 1 }} 
            onClick={() => getNextView()}>
            <div className={post.commentSide}>
                {emailViewToggle ? 
                    <div className={index.fadeInFast} style={{color: 'white', fontFamily: 'San Francisco', fontSize: '0.7rem'}}>
                        dear @rnmkr.&nbsp;&nbsp;|&nbsp;&nbsp;send
                    </div> : 
                    <div />}
            </div>
            <div className={post.commentCenter}>
                {viewToggle ? 
                    reportViewToggle ? 
                        <ReportView 
                            deleteToggle={deleteToggle}
                            deletePost={deletePost} 
                        /> :
                        emailViewToggle ?
                            <EmailView /> :
                            <BackView 
                                isMine={isMine} 
                                isLiked={isLiked}
                                theNumberOfLike={theNumberOfLike}
                                deleteToggle={deleteToggle}
                                toggleLikeState={toggleLikeState}
                                deletePost={deletePost} 
                                setReportViewToggle={setReportViewToggle}
                                setEmailViewToggle={setEmailViewToggle}
                                redirect={redirect}
                            /> : 
                    <FrontView 
                        cakeRating={cakeRating} 
                        splitComment={splitComment} 
                    />}
            </div>
            <div className={post.commentSide}>
                <div className={post.toggleButtonWrapper} onClick={(e) => toggleView(e)}>
                    <div className={classNames([post.toggleButton, index.fadeInFast])} />
                </div>
            </div>
        </div>
    );
}

type FrontViewProps = {
    cakeRating: number,
    splitComment: string[]
}

function FrontView({
    cakeRating,
    splitComment}: FrontViewProps) {

    return (
        <div className={index.fadeInFast}>
            {splitComment.length ?
                <div className={post.commentEnabled}>
                    {splitComment.map((line, key) => {
                        return <div key={key}>{line}</div>
                    })}
                </div> :
                <div className={post.commentDisabled}>
                    please write a comment
                    </div>
            }
            <div className={post.cakeRating}>
                {cakeRating === 3 ?
                    THREE_PIECES_OF_CAKE :
                    cakeRating === 2 ? TWO_PIECES_OF_CAKE :
                        A_PIECE_OF_CAKE}
            </div>
        </div>
    );
}

type BackViewProps = {
    isMine: boolean,
    isLiked: boolean,
    theNumberOfLike: number,
    deleteToggle: boolean,
    toggleLikeState: () => void,
    deletePost: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
    setReportViewToggle: React.Dispatch<React.SetStateAction<boolean>>,
    setEmailViewToggle: React.Dispatch<React.SetStateAction<boolean>>,
    redirect: (page: Page) => void
}

function BackView({ 
    isMine, 
    isLiked,
    theNumberOfLike,
    deleteToggle, 
    toggleLikeState,
    deletePost,
    setReportViewToggle,
    setEmailViewToggle,
    redirect}: BackViewProps) {

    function getUserProfile(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
    }

    function likePost(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        toggleLikeState();
    }

    function getReportView(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        setReportViewToggle(true);
    }

    function getEmailView(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        //redirect(MY_POST_LIST);
        setEmailViewToggle(true);
    }

    return (
        <div className={classNames([index.fadeInFast, post.commentEnabled])}>
            <span style={{}} onClick={(e) => getUserProfile(e)}>
                @rnmkr
            </span>
            <br />
            <br />
            <div>2021.04.09</div>
            <div>데이트하기 좋은 #고래상점</div>
            <br />
            <div>
                <span style={{display: isMine ? 'none' : 'inline'}} onClick={(e) => getReportView(e)}>
                    <img alt="" src={Hammer} className={index.secondaryColor} style={{width: '3.5vw'}}/>
                </span>
                <span style={{display: isMine ? 'none' : 'inline'}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span onClick={(e) => likePost(e)}>
                    <img alt="" 
                         src={isLiked ? FilledHeart : EmptyHeart} 
                         className={isLiked ? index.filledHeartColor : index.emptyHeartColor} 
                         style={{width: '4vw'}}/>
                    &nbsp;
                    {theNumberOfLike}
                </span>
            </div>
            <br />
            {isMine ? 
                deleteToggle ? 
                    <span key={0} className={index.fadeInFast} onClick={(e) => deletePost(e)}>are you sure?</span> : 
                    <span key={1} className={index.fadeInFast} onClick={(e) => deletePost(e)}>delete this post</span>
                : <span onClick={(e) => getEmailView(e)}>send email @rnmkr</span>}
        </div>
    );
}

type ReportViewProps = {
    deleteToggle: boolean,
    deletePost: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

function ReportView({ 
    deleteToggle,
    deletePost }: ReportViewProps) {

    return (
        <div className={post.commentEnabled}>
            {deleteToggle ?
                <span key={0} className={index.fadeInFast} onClick={(e) => deletePost(e)}>are you sure?</span> : 
                <span key={1} className={index.fadeInFast} onClick={(e) => deletePost(e)}>report this post</span>}
        </div>
    );
}

function EmailView() {
    function onClick(e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) {
        e.stopPropagation();
    }

    return (
        <textarea className={classNames([post.note, index.fadeInFast])} spellCheck="false" onClick={(e) => onClick(e)} />
    );
}

export default Post;