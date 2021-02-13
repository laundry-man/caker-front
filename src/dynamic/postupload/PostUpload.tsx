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

function PostUpload({
    contentRef,
    redirect,
    setPredecessor }: PostUploadProps) {

    const [toggle, setToggle] = useState(false);

    const [croppedImageList, setCroppedImageList] = useState<string[]>([]);
    const [imageSetterList, setImageSetterList] = useState<JSX.Element[]>([]);

    const [length, setLength] = useState(0);

    const [preIndex, setPreIndex] = useState(0);
    const [pathIndex, setPathIndex] = useState(0);

    function getNextView() {
        if (pathIndex < length - 1) {
            setPreIndex(pathIndex);
            setPathIndex(pathIndex + 1 == length ? 0 : pathIndex + 1);
        }
        else {
            setPreIndex(pathIndex);
            setPathIndex(pathIndex + 1 == length ? 0 : pathIndex + 1);
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
                    croppedImageList={croppedImageList}
                    setToggle={setToggle}
                    setLength={setLength}
                    setCroppedImageList={setCroppedImageList}
                    setImageSetterList={setImageSetterList}
                />
            }
        </div>
    );
}

type FrontViewProps = {
    contentRef: React.RefObject<HTMLDivElement>,
    croppedImageList: string[],
    setToggle: React.Dispatch<React.SetStateAction<boolean>>,
    setLength: React.Dispatch<React.SetStateAction<number>>,
    setCroppedImageList: React.Dispatch<React.SetStateAction<string[]>>,
    setImageSetterList: React.Dispatch<React.SetStateAction<JSX.Element[]>>
};

function FrontView({
    contentRef,
    croppedImageList,
    setLength,
    setToggle,
    setCroppedImageList,
    setImageSetterList }: FrontViewProps) {

    const [preCroppedImageList, setPreCroppedImageList] = useState<string[]>(croppedImageList);
    const fileRef = useRef<HTMLInputElement>(null);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        let _length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;
        let _croppedImageList: string[] = [];

        for (let i = 0; _length && i < _length; i++) {
            const imagePath =
                (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));
            _croppedImageList.push(imagePath);
        }

        setCroppedImageList(_croppedImageList);
    };

    useEffect(() => {
        if (preCroppedImageList.length !== croppedImageList.length) {
        let _length: number = croppedImageList.length;
        let _imageSetterList: JSX.Element[] = [];

        for (let i = 0; _length && i < _length; i++) {
            _imageSetterList.push(
                <ImageCropper
                    key={i}
                    imageIndex={i}
                    croppedImageList={croppedImageList}
                    setCroppedImageList={setCroppedImageList}
                />
            );
        }

        _imageSetterList.push(<ImageUploader key={_length} />);

        setImageSetterList(_imageSetterList);
        setLength(_length + 1);

        contentRef.current?.append(`1/${_length + 1}`);

        setToggle(true);
    }
    }, [croppedImageList])

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