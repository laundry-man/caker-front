import React, { useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

import TagList from './TagList';
import ImageList from './ImageList';

import { EMPTY_STRING, ENTER_KEY, RESET_ICON } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageUploader from '../../static/css/postupload/imageUploader.module.css';

type Tag = {
    name: string,
    count: number
};

function ImageUploader() {
    const [toggle, setToggle] = useState(false);
    
    const [input, setInput] = useState(EMPTY_STRING);
    const [isWritten, setIsWritten] = useState(false);
    const [tagList, setTagList] = useState<Tag[]>([]);

    function attachHashtag(tag: string) {
        return '#' + tag.toLowerCase();
    }

    function startSearch() {
        setInput(EMPTY_STRING);
        setTagList([]);
        setIsWritten(false);
        setToggle(true);
    }

    function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === EMPTY_STRING) {
            setInput(EMPTY_STRING);
            setIsWritten(false);
        }
        else {
            setInput(e.target.value);
            setIsWritten(true);
            setTagList([...tagList, { name: attachHashtag(e.target.value.toLowerCase()), count: 99 }]);
        }
    };

    function selectKeyword() {
        setToggle(false);
    }

    function submitKeyword(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === ENTER_KEY)
            selectKeyword();
    }

    function clearKeyword() {
        if (isWritten) {
            setInput(EMPTY_STRING);
            setTagList([]);
            setIsWritten(false);
            setToggle(false);
        }
    }

    function getNewData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        });
    };

    function resetData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        });
    }

    return (
        <div className={classNames([imageUploader.uploader, index.fadeInSlow])}>
            <div className={imageUploader.searchWrapper}>
                <input className={imageUploader.searchPrepend} value="#" readOnly />
                <input className={imageUploader.searchInput} 
                    placeholder="태그"
                    value={input}
                    onClick={startSearch}
                    onChange={(e) => changeInput(e)}
                    onKeyUp={(e) => submitKeyword(e)} />
                <input className={imageUploader.searchAppend}
                    value={isWritten ? RESET_ICON : EMPTY_STRING}
                    onClick={() => clearKeyword()}
                    readOnly />
            </div>
            { toggle ?
                <TagList 
                    tagListProp={tagList} 
                    isWritten={isWritten} 
                    selectKeyword={selectKeyword} 
                /> :
                <div className={index.fadeInSlow}>
                    <div className={imageUploader.textWrapper}>
                        <input className={imageUploader.textPrepend} readOnly />
                        <input className={imageUploader.textInput} />
                        <input className={imageUploader.textAppend} readOnly />
                    </div>
                    <PullToRefresh
                        onRefresh={resetData}
                        canFetchMore={true}
                        isPullable={true}
                        onFetchMore={getNewData}
                        fetchMoreThreshold={0}
                        pullDownThreshold={67}
                        maxPullDownDistance={95}
                        className={classNames([index.pullToRefresh])}>
                        <ImageList />
                    </PullToRefresh>
                </div>
            }
        </div>
    );
}


export default ImageUploader;