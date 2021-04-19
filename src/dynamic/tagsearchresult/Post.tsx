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
        <div onClick={getNextView}>
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
    imagePath: string
};

function ActiveView({
    isMine,
    cakeRating,
    splitComment,
    isComment,
    imagePath }: ActiveViewProps) {
    return (
        <div className={classNames([post.image, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')' }}>
            {isComment ? 
                <CommentView 
                    isMine={isMine} 
                    cakeRating={cakeRating} 
                    splitComment={splitComment} 
                /> : <></>}
        </div>
    );
}

type CommentProps = {
    isMine: boolean,
    cakeRating: number,
    splitComment: string[]
}

function CommentView({
    isMine,
    cakeRating,
    splitComment }: CommentProps) {

    return (
        <div>
            <div className={post.comment}>
                <div className={post.commentTop} />
                <div className={post.commentMiddle}>
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
                    <div className={post.commentSide} />
                    <div className={post.commentCenter}>
                        {isMine ? <span>delete / save</span> : <></>}
                    </div>
                    <div className={post.commentSide} />
                </div>
            </div>
        </div>
    );
}

export default Post;