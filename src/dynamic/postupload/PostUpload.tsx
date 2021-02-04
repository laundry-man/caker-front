import React, { useEffect, useRef, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import ImageCropper from './ImageCropper';
import ImageList from './ImageList';
import TagList from './TagList';

import { EMPTY_STRING, RESET_ICON, ENTER_KEY } from '../../const/Constant';

import Tux from '../../static/image/Tux.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import postUpload from '../../static/css/postupload/postUpload.module.css';

type UploadProps = {
    contentRef: React.RefObject<HTMLDivElement>,
    redirect: (path: string) => void,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

function Upload({ contentRef, redirect, setPredecessor }: UploadProps) {
    const [toggle, setToggle] = useState(false);

    const [imageCropperList, setImageCropperList] = useState<JSX.Element[]>();

    const [length, setLength] = useState(0);

    const [preIndex, setPreIndex] = useState(0);
    const [pathIndex, setPathIndex] = useState(0);

    function getNextView() {
        setPreIndex(pathIndex);
        setPathIndex(pathIndex + 1 == length ? 0 : pathIndex + 1);
    };

    useEffect(() => {
        setPredecessor('/upload');
    }, []);

    useEffect(() => {
        if (preIndex !== pathIndex) {
            contentRef.current?.removeChild(contentRef.current?.childNodes[0]);
            contentRef.current?.append(`${pathIndex + 1}/${length}`);
        }
    }, [pathIndex]);

    return (
        <div className={postUpload.wrapper}>
            {toggle && imageCropperList ?
                <ActiveView 
                    getNextView={getNextView} 
                    component={imageCropperList[pathIndex]} 
                /> :
                <FrontView 
                    contentRef={contentRef}
                    setToggle={setToggle}
                    setLength={setLength}
                    setImageCropperList={setImageCropperList}
                />
            }
        </div>
    );
}

type ActiveViewProps = {
    component: JSX.Element
    getNextView: () => void
}

function ActiveView({ component, getNextView }: ActiveViewProps) {
    return (
        <div onClick={() => getNextView()} className={index.fadeInSlow}>
            {component}
        </div>
    );
}

type FrontViewProps = {
    contentRef: React.RefObject<HTMLDivElement>
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
    setLength: React.Dispatch<React.SetStateAction<number>>
    setImageCropperList: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>
}

function FrontView({
    contentRef,
    setLength,
    setToggle,
    setImageCropperList}: FrontViewProps) {

    const fileRef = useRef<HTMLInputElement>(null);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        let _length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;
        let _imageCropperList: JSX.Element[] = [];

        for (let i = 0; _length && i < _length; i++) {
            const path = (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));
            _imageCropperList.push(<ImageCropper imagePath={path}></ImageCropper>);
        }
        
        _imageCropperList.push(<Uploader />);

        setImageCropperList(_imageCropperList);
        setLength(_length + 1);

        contentRef.current?.append(`1/${_length + 1}`);

        setToggle(true);
    };

    return (
        <div className={classNames([postUpload.frontView, index.fadeInSlow])}>
            <div className={postUpload.frontViewContent1}>please</div>
            <div className={postUpload.frontViewContent2}>touch</div>
            <div className={postUpload.frontViewContent3}>me.</div>
            <img alt="" 
                className={postUpload.frontViewContent4} 
                src={Tux} 
                onClick={() => fileRef.current?.click()} />
            <input ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                multiple={true}
                onChange={(e) => onChange(e)} />
        </div>
    );
}

type Tag = {
    name: string,
    count: number
};

function Uploader() {
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
        <div className={postUpload.uploader}>
            <div className={postUpload.searchWrapper}>
                <input className={postUpload.searchPrepend} value="#" readOnly />
                <input className={postUpload.searchInput} 
                    placeholder="태그"
                    value={input}
                    onClick={startSearch}
                    onChange={(e) => changeInput(e)}
                    onKeyUp={(e) => submitKeyword(e)} />
                <input className={postUpload.searchAppend}
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
                <>
                    <div className={classNames([postUpload.temp, index.fadeInFast])}>
                    </div>
                    <PullToRefresh
                        onRefresh={resetData}
                        canFetchMore={true}
                        isPullable={true}
                        onFetchMore={getNewData}
                        fetchMoreThreshold={0}
                        pullDownThreshold={67}
                        maxPullDownDistance={95}
                        className={classNames([index.pullToRefresh, index.fadeInFast])}>
                        <ImageList />
                    </PullToRefresh>
                </>
            }
        </div>
    );
}

export default Upload;