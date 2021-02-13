import React, { useEffect, useRef, useState } from 'react';

import ImageCropper from './ImageCropper';
import ImageUploader from './ImageUploader';

import Tux from '../../static/image/Tux.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import postUpload from '../../static/css/postupload/postUpload.module.css';

type PostUploadProps = {
    contentRef: React.RefObject<HTMLDivElement>,
    redirect: (path: string) => void,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

function PostUpload({ contentRef, redirect, setPredecessor }: PostUploadProps) {
    const [toggle, setToggle] = useState(false);

    const [imageSetterList, setImageSetterList] = useState<JSX.Element[]>();

    const [length, setLength] = useState(0);

    const [preIndex, setPreIndex] = useState(0);
    const [pathIndex, setPathIndex] = useState(0);

    function getNextView() {
        if (pathIndex < length - 1) {
            setPreIndex(pathIndex);
            setPathIndex(pathIndex + 1 == length ? 0 : pathIndex + 1);
        }
        else {
            
        }
    };

    useEffect(() => {
        setPredecessor('/postupload');
    }, []);

    useEffect(() => {
        if (preIndex !== pathIndex) {
            contentRef.current?.removeChild(contentRef.current?.childNodes[0]);
            contentRef.current?.append(`${pathIndex + 1}/${length}`);
        }
    }, [pathIndex]);

    return (
        <div className={postUpload.wrapper}>
            {toggle && imageSetterList ?
                <div onClick={() => getNextView()}>
                    {imageSetterList[pathIndex]}
                </div> :
                <FrontView 
                    contentRef={contentRef}
                    setToggle={setToggle}
                    setLength={setLength}
                    setImageSetterList={setImageSetterList}
                />
            }
        </div>
    );
}

type FrontViewProps = {
    contentRef: React.RefObject<HTMLDivElement>
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
    setLength: React.Dispatch<React.SetStateAction<number>>
    setImageSetterList: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>
};

function FrontView({
    contentRef,
    setLength,
    setToggle,
    setImageSetterList}: FrontViewProps) {

    const fileRef = useRef<HTMLInputElement>(null);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        let _length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;
        let _imageSetterList: JSX.Element[] = [];

        for (let i = 0; _length && i < _length; i++) {
            _imageSetterList.push(
                <ImageCropper
                    key={i} 
                    imagePath={(window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i))}
                />
            );
        }
        
        _imageSetterList.push(<ImageUploader />);

        setImageSetterList(_imageSetterList);
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

export default PostUpload;