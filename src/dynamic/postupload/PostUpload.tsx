import React, { useEffect, useRef, useState } from 'react';

import ImageCropper from './ImageCropper';
import ImageUploader from './ImageUploader';

import Tux from '../../static/image/Tux.png';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import postUpload from '../../static/css/postupload/postUpload.module.css';

type Area = {
    width: number,
    height: number,
    x: number,
    y: number,
};

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

    const [imageSetterList, setImageSetterList] = useState<JSX.Element[]>([]);

    const [length, setLength] = useState(0);

    const [preIndex, setPreIndex] = useState(0);
    const [setterIndex, setSetterIndex] = useState(0);

    let rawImageList: string[] = [];
    let croppedAreaPixelsList: Area[] = [];

    function getNextView() {
        if (setterIndex < length - 1) {
            setPreIndex(setterIndex);
            setSetterIndex(setterIndex + 1 === length ? 0 : setterIndex + 1);
        }
    };

    function setCroppedAreaPixels(imageIndex: number, croppedAreaPixels: Area) {
        if (croppedAreaPixelsList.length - 1 < imageIndex)
            croppedAreaPixelsList.push(croppedAreaPixels);
        else
            croppedAreaPixelsList[imageIndex] = croppedAreaPixels;
    }

    useEffect(() => {
        setPredecessor('/postupload');
    }, []);

    useEffect(() => {
        if (preIndex !== setterIndex) {
            contentRef.current?.removeChild(contentRef.current?.childNodes[0]);
            contentRef.current?.append(`${setterIndex + 1}/${length}`);
        }
    }, [setterIndex]);

    return (
        <div className={postUpload.wrapper}>
            {toggle && imageSetterList ?
                <div onClick={() => getNextView()}>
                    {imageSetterList[setterIndex]}
                </div> :
                <FrontView
                    toggle={toggle}
                    contentRef={contentRef}
                    rawImageList={rawImageList}
                    croppedAreaPixelsList={croppedAreaPixelsList}
                    setToggle={setToggle}
                    setLength={setLength}
                    setImageSetterList={setImageSetterList}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                />
            }
        </div>
    );
}

type FrontViewProps = {
    toggle: boolean,
    contentRef: React.RefObject<HTMLDivElement>,
    rawImageList: string[],
    croppedAreaPixelsList: Area[],
    setToggle: React.Dispatch<React.SetStateAction<boolean>>,
    setLength: React.Dispatch<React.SetStateAction<number>>,
    setImageSetterList: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    setCroppedAreaPixels: (imageIndex: number, croppedAreaPixels: Area) => void
};

function FrontView({
    toggle,
    contentRef,
    rawImageList,
    croppedAreaPixelsList,
    setLength,
    setToggle,
    setImageSetterList,
    setCroppedAreaPixels }: FrontViewProps) {

    const fileRef = useRef<HTMLInputElement>(null);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;

        for (let i = 0; i < length; i++) {
            const imagePath =
                (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));

            rawImageList.push(imagePath);
        }

        let imageSetterList: JSX.Element[] = [];

        for (let i = 0; i < length; i++) {
            imageSetterList.push(
                <ImageCropper
                    key={i}
                    imageIndex={i}
                    rawImageList={rawImageList}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                />
            );
        }

        imageSetterList.push(
            <ImageUploader
                key={length}
                rawImageList={rawImageList}
                croppedAreaPixelsList={croppedAreaPixelsList}
            />
        );

        setImageSetterList(imageSetterList);
        setLength(length + 1);

        contentRef.current?.append(`1/${length + 1}`);

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