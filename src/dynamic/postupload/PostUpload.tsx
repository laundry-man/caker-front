import React, { useEffect, useRef, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import ImageCropper from './ImageCropper';
import ImageList from './ImageList';
import TagList from './TagList';

import { EMPTY_STRING, RESET_ICON, ENTER_KEY } from '../../const/Constant';

import postUpload from '../../static/css/postupload/postUpload.module.css';
import Tux from '../../static/image/Tux.png';

type Tag = {
    name: string,
    count: number
};
  
type ActiveImageViewProps = {
    getNextView: () => void,
    innerElement: JSX.Element
}

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

    function FrontUpload() {
        const fileRef = useRef<HTMLInputElement>(null);

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let _length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;
            let _imageCropperList: JSX.Element[] = [];

            for (let i = 0; _length && i < _length; i++) {
                const path = (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));
                _imageCropperList.push(<ImageCropper imagePath={path}></ImageCropper>);
            }

            //Uploader
            _imageCropperList.push(<BackUpload></BackUpload>);

            setImageCropperList(_imageCropperList);
            setLength(_length + 1);

            contentRef.current?.append(`1/${_length + 1}`);

            setToggle(true);
        };

        return (
            <div className="upload fade-in-slow">
                <div className="upload-content-1">please</div>
                <div className="upload-content-2">touch</div>
                <div className="upload-content-3">me.</div>
                <img className="upload-content-4" src={Tux} alt="" onClick={() => fileRef.current?.click()}></img>
                <input ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple={true}
                    onChange={(e) => onChange(e)} />
            </div>
        );
    }

    function BackUpload() {
        const [toggle, setToggle] = useState(false);
        
        const [input, setInput] = useState(EMPTY_STRING);
        const [writing, setWriting] = useState(false);
        const [tagList, setTagList] = useState<Tag[]>([]);

        const attach = (tag: string) => '#' + tag.toLowerCase();

        const search = () => {
            setInput(EMPTY_STRING);
            setTagList([]);
            setWriting(false);
            setToggle(true);
        }

        const change = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === EMPTY_STRING) {
                setInput(EMPTY_STRING);
                setWriting(false);
            }
            else {
                setInput(e.target.value);
                setWriting(true);
                setTagList([...tagList, { name: attach(e.target.value.toLowerCase()), count: 99 }]);
            }
        };

        const assign = () => {
            setToggle(false);
        }

        const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === ENTER_KEY)
                assign();
        }

        const clear = () => {
            if (writing) {
                setInput(EMPTY_STRING);
                setTagList([]);
                setWriting(false);
                setToggle(false);
            }
        }

        const getNewData = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        };

        const resetData = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }

        return (
            <div className="cropper">
                <div className="post-wrapper">
                    <input className="post-prepend" value="#" readOnly />
                    <input className="post-input" placeholder="태그"
                        value={input}
                        onClick={search}
                        onChange={(e) => change(e)}
                        onKeyUp={(e) => submit(e)} />
                    <input className="post-append"
                        value={writing ? RESET_ICON : EMPTY_STRING}
                        onClick={() => clear()}
                        readOnly />
                </div>

                { toggle ?
                    <TagList tagListProp={tagList} isWritten={writing} assignKeyword={assign}></TagList> :
                    <>
                        <div className="temp fade-in-fast">
                        </div>
                        <PullToRefresh
                            onRefresh={resetData}
                            canFetchMore={true}
                            isPullable={true}
                            onFetchMore={getNewData}
                            fetchMoreThreshold={0}
                            pullDownThreshold={67}
                            maxPullDownDistance={95}
                            className={"pull-to-refresh fade-in-fast"}>
                            <ImageList></ImageList>
                        </PullToRefresh>
                    </>
                }
            </div>
        );
    }

    function ActiveView({ getNextView, innerElement }: ActiveImageViewProps) {
        return (
            <div onClick={() => getNextView()} className="fade-in-slow">
                {innerElement}
            </div>
        );
    }

    useEffect(() => {
        setPredecessor('/upload');
    }, []);

    useEffect(() => {
        if (preIndex != pathIndex) {
            contentRef.current?.removeChild(contentRef.current?.childNodes[0]);
            contentRef.current?.append(`${pathIndex + 1}/${length}`);
        }
    }, [pathIndex]);

    return (
        <div className="upload-wrapper">
            {toggle && imageCropperList ?
                <ActiveView 
                    getNextView={getNextView} 
                    innerElement={imageCropperList[pathIndex]} 
                /> :
                <BackUpload />}
        </div>
    );
}

export default Upload;