import React, { useEffect, useRef, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import ImageView from './ImageView';
import ImageList from './ImageList';
import { ActiveImageViewProps, UploadProps } from '../const/Type';

import '../static/css/upload.css';
import Tux from '../static/image/Tux.png';

function Upload({ contentRef, redirect, setPredecessor }: UploadProps) {
    const [toggle, setToggle] = useState(false);

    const [imageViewList, setImageViewList] = useState<JSX.Element[]>();

    const [length, setLength] = useState(0);

    const [preIndex, setPreIndex] = useState(0);
    const [pathIndex, setPathIndex] = useState(0);

    const getNextView = () => {
        setPreIndex(pathIndex);
        setPathIndex(pathIndex + 1 == length ? 0 : pathIndex + 1);
    };

    function FrontUpload() {
        const fileRef = useRef<HTMLInputElement>(null);

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let _length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;
            let _imageViewList: JSX.Element[] = [];

            for (let i = 0; _length && i < _length; i++) {
                const path = (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));
                _imageViewList.push(<ImageView path={path}></ImageView>);
            }

            _imageViewList.push(<BackUpload></BackUpload>);

            setImageViewList(_imageViewList);
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
                <div className="text-input-wrapper">
                    <input className="text-input-prepend" value="#" readOnly />
                    <input className="text-input" placeholder="태그" />
                    <input className="text-input-append" readOnly />
                </div>
                <div className="temp">
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
            {toggle && imageViewList ?
                <ActiveView getNextView={getNextView} innerElement={imageViewList[pathIndex]}></ActiveView> :
                <FrontUpload></FrontUpload>}
        </div>
    );
}

export default Upload;