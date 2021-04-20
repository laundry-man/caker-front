import React, { useEffect, useState } from 'react';

import { EMPTY_STRING, COMMENT_MAX_WIDTH, A_PIECE_OF_CAKE, TWO_PIECES_OF_CAKE, THREE_PIECES_OF_CAKE } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import post from '../../static/css/tagsearchresult/post.module.css';

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

    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    function deletePost() {
        if (toggle) {
            if (timer !== undefined)
                clearInterval(timer);
            setIsDeleted(true);
        }
        else {
            setToggle(true);
            setTimer(
                setTimeout(() => {
                    setToggle(false);
                }, 5000)
            );
        }
    }

    return (
        <div className={post.comment} style={{display: isDeleted ? 'none' : 'block'}}>
            <div className={post.commentTop} onClick={() => getNextView()} />
            <div className={post.commentMiddle} onClick={() => getNextView()}>
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
            <div className={post.commentBottom}>
                <div className={post.commentSide} onClick={() => getNextView()} />
                <div className={post.commentCenter} onClick={isMine ? () => { } : () => getNextView()}>
                    {isMine ?
                        !toggle ?
                            <span key={0} className={index.fadeInFast} onClick={() => deletePost()}>
                                delete
                                </span>
                            :
                            <span key={1} className={index.fadeInFast} onClick={() => deletePost()}>
                                sure?
                                </span>
                        : <></>}
                </div>
                <div className={post.commentSide} onClick={() => getNextView()} />
            </div>
        </div>
    );
}

export default Post;