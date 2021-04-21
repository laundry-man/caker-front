import React, { useEffect, useState } from 'react';

import { EMPTY_STRING, COMMENT_MAX_WIDTH, A_PIECE_OF_CAKE, TWO_PIECES_OF_CAKE, THREE_PIECES_OF_CAKE } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import post from '../../static/css/tagsearchresult/post.module.css';

import Hammer from '../../static/icon/legal-hammer.svg';
import FilledHeart from '../../static/icon/heart-shape-silhouette.svg';
import EmptyHeart from '../../static/icon/heart-shape-outline.svg';

type PostProps = {
    isMine: boolean,
    commentInput: string,
    cakeRating: number,
    imagePathList: string[]
};

function Post({
    isMine,
    commentInput,
    cakeRating,
    imagePathList }: PostProps) {

    const [splitComment, setSplitComment] = useState<string[]>([]);

    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < imagePathList.length; i++)
            _active.push(i === 0 ? true : false);
        return _active;
    })());

    function getNextView() {
        let _active: boolean[] = [...active];
        let _f: boolean | undefined = _active.pop();
        _active.unshift(_f === undefined ? false : _f);
        setActive(_active);
    }

    function assignComment() {
        let split: string[] = splitCommentByApproximateWidth(commentInput);
        setSplitComment(split);
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

    useEffect(() => {
        assignComment();
    }, []);

    return (
        <div>
            {active.map((active, key) => {
                if (active) {
                    return (
                        <ActiveView
                            key={key}
                            isMine={isMine}
                            cakeRating={cakeRating}
                            splitComment={splitComment}
                            isComment={key === 1 ? true : false}
                            imagePath={imagePathList[key]}
                            getNextView={getNextView}
                        />
                    );
                }
                return <></>;
            })}
        </div>
    );
}

type ActiveViewProps = {
    isMine: boolean,
    cakeRating: number,
    splitComment: string[],
    isComment: boolean,
    imagePath: string,
    getNextView: () => void
};

function ActiveView({
    isMine,
    cakeRating,
    splitComment,
    isComment,
    imagePath,
    getNextView }: ActiveViewProps) {

    const [isDeleted, setIsDeleted] = useState(false);

    return (
        <div className={classNames([post.image, index.fadeInFast])}
            style={{ 
                height: isDeleted ? '0' : '80vw', 
                marginBottom: isDeleted ? '0' : '1vh', 
                backgroundImage: 'url(' + imagePath + ')' }}>
            {isComment ?
                <CommentView
                    isMine={isMine}
                    isDeleted={isDeleted}
                    cakeRating={cakeRating}
                    splitComment={splitComment}
                    getNextView={getNextView}
                    setIsDeleted={setIsDeleted}
                /> :
                <div style={{ width: '80vw', height: '80vw', borderRadius: '5px' }}
                    onClick={() => getNextView()} />
            }
        </div>
    );
}

type CommentViewProps = {
    isMine: boolean,
    isDeleted: boolean,
    cakeRating: number,
    splitComment: string[],
    getNextView: () => void,
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

function CommentView({
    isMine,
    isDeleted,
    cakeRating,
    splitComment,
    getNextView,
    setIsDeleted }: CommentViewProps) {

    const [viewToggle, setViewToggle] = useState(false);
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
        setViewToggle(!viewToggle);
    }

    return (
        <div className={post.comment} style={{display: isDeleted ? 'none' : 'block'}} onClick={() => getNextView()}>
            <div className={post.commentSide} />
            <div className={post.commentCenter}>
                {viewToggle ? 
                    <BackView 
                        isMine={isMine} 
                        deleteToggle={deleteToggle}
                        deletePost={deletePost} 
                    /> 
                    : 
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
    deleteToggle: boolean,
    deletePost: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

function BackView({ 
    isMine, 
    deleteToggle, 
    deletePost }: BackViewProps) {

    const [isLoaded, setIsLoaded] = useState(false);

    function getUserProfile(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
    }

    function likePost(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
    }

    function report(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
    }

    function sendEmail(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
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
            <div style={{}}>
                <span onClick={(e) => report(e)}>
                    <img alt="" src={Hammer} className={index.secondaryColor} style={{width: '3.5vw'}}/>
                </span>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span onClick={(e) => likePost(e)}>
                    <img alt="" src={EmptyHeart} className={index.secondaryColor} style={{width: '4vw'}}/> 123
                </span>
            </div>
            <br />
            {isMine ? 
                deleteToggle ? 
                    <span key={0} className={index.fadeInFast} onClick={(e) => deletePost(e)}>sure?</span> : 
                    <span key={1} onClick={(e) => deletePost(e)}>delete</span>
                : <span onClick={(e) => sendEmail(e)}>send email @rnmkr</span>}
        </div>
    );
}

export default Post;