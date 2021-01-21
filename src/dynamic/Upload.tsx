import React, { useEffect, useRef, useState } from 'react';

import ImageView from './ImageView';
import { ActiveImageViewProps, UploadProps } from '../const/Type';

import '../static/css/upload.css';

import Tux from '../static/image/Tux.png';

function Upload({ redirect, setContent, setPredecessor }: UploadProps) {
    const [toggle, setToggle] = useState(false);

    const [imageViewList, setImageViewList] = useState<JSX.Element[]>();

    const [length, setLength] = useState(0);
    const [pathIndex, setPathIndex] = useState(0);

    const getNextView = () => {
        setPathIndex(pathIndex + 1 == length ? 0 : pathIndex + 1);
    };

    function Entrance() {
        const fileRef = useRef<HTMLInputElement>(null);

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let _length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;
            let _imageViewList: JSX.Element[] = [];

            for (let i = 0; _length && i < _length; i++) {
                const path = (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));
                _imageViewList.push(<ImageView path={path}></ImageView>);
            }

            setImageViewList(_imageViewList);
            setLength(_length);
            setPathIndex(0);

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

    function ActiveView({ innerElement }: ActiveImageViewProps) {
        return (
            <div className="fade-in-slow">
                {innerElement}
            </div>
        );
    }

    return (
        <div className="upload-wrapper">
            {toggle && imageViewList ?
                <div onClick={getNextView}>
                    <ActiveView innerElement={imageViewList[pathIndex]}></ActiveView>
                </div> :
                <Entrance></Entrance>
            }
        </div>
    );
}

export default Upload;