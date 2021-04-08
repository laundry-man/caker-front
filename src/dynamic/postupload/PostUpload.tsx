import React, { useEffect, useRef, useState } from 'react';

import Vibe from './Vibe';
import ImageCropper from './ImageCropper';
import ImageUploader from './ImageUploader';
import { blobToURL, fromURL } from 'image-resize-compress';

import { Page, POST_UPLOAD, CANVAS_MAX_SIZE } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import postUpload from '../../static/css/postupload/postUpload.module.css';

import Matin1 from '../../static/image/matin_1.png';
import Matin2 from '../../static/image/matin_2.png';

type Area = {
    width: number,
    height: number,
    x: number,
    y: number,
};

type PostUploadProps = {
    pageDidMount: (page: Page) => void,
    redirect: (page: Page) => void,
    setPredecessor: React.Dispatch<React.SetStateAction<Page>>
}

function PostUpload({
    pageDidMount,
    redirect,
    setPredecessor }: PostUploadProps) {

    const [toggle, setToggle] = useState(false);

    const [imageSetterList, setImageSetterList] = useState<JSX.Element[]>([]);

    const [length, setLength] = useState(0);

    const [setterIndex, setSetterIndex] = useState(0);

    let rawImageList: string[] = [];
    let croppedAreaPixelsList: Area[] = [];

    function getNextView() {
        if (setterIndex < length - 1) {
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
        pageDidMount(POST_UPLOAD);
    }, []);

    return (
        <div className={postUpload.wrapper}>
            {toggle && imageSetterList ?
                <div onClick={() => getNextView()}>
                    {imageSetterList[setterIndex]}
                </div> :
                /*<ImageUploader
                    rawImageList={[Matin1, Matin2]}
                    croppedAreaPixelsList={[
                        { width: 1125, height: 1125, x: 0, y: 0 },
                        { width: 1125, height: 1125, x: 0, y: 0 }
                    ]}
                />*/
                <FrontView
                    toggle={toggle}
                    rawImageList={rawImageList}
                    croppedAreaPixelsList={croppedAreaPixelsList}
                    setLength={setLength}
                    setToggle={setToggle}
                    setImageSetterList={setImageSetterList}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                />
            }
        </div>
    );
}

type ImageSize = {
    width: number,
    height: number
};

type GetImageSize = (rawImagePath: string) => Promise<ImageSize>;

type FrontViewProps = {
    toggle: boolean,
    rawImageList: string[],
    croppedAreaPixelsList: Area[],
    setLength: React.Dispatch<React.SetStateAction<number>>,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>,
    setImageSetterList: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    setCroppedAreaPixels: (imageIndex: number, croppedAreaPixels: Area) => void
};

function FrontView({
    toggle,
    rawImageList,
    croppedAreaPixelsList,
    setLength,
    setToggle,
    setImageSetterList,
    setCroppedAreaPixels }: FrontViewProps) {

    const fileRef = useRef<HTMLInputElement>(null);

    const [isStretch, setIsStretch] = useState(false);

    const getImageSize: GetImageSize = async (rawImagePath: string) => {
        return new Promise((resolve) => {
            let rawImage = new Image();
            rawImage.onload = () => {
                const width: number = rawImage.width;
                const height: number = rawImage.height;
                const imageSize: ImageSize = { width, height };
                resolve(imageSize);
            };
            rawImage.src = rawImagePath;
        });
    };

    async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const length: number = e.currentTarget.files ? e.currentTarget.files.length : 0;

        for (let i = 0; i < length; i++) { 
            const rawImagePath =
                (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i));
            
            const rawImageSize: ImageSize = await getImageSize(rawImagePath);

            const width: number = rawImageSize.width;
            const height: number = rawImageSize.height;

            if (width > CANVAS_MAX_SIZE || height > CANVAS_MAX_SIZE) {
                let resized: Blob = new Blob();

                if (width > height)
                    resized = await fromURL(rawImagePath, 100, CANVAS_MAX_SIZE, 'auto', 'jpeg');
                else 
                    resized = await fromURL(rawImagePath, 100, 'auto', CANVAS_MAX_SIZE, 'jpeg');

                const resizedImagePath = await blobToURL(resized);

                rawImageList.push(resizedImagePath);
            }
            else {
                rawImageList.push(rawImagePath);
            }
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

        setToggle(true);
    };

    return (
        <div className={classNames([postUpload.frontView, index.fadeInSlow])}>
            <Vibe isStretch={isStretch} setIsStretch={setIsStretch} />
            <div className={postUpload.separator} style={{height : isStretch ? '0.3vh' : '3.5vh'}}/>
            <div className={postUpload.previewImageList}>
                <div className={postUpload.previewImageWrapper} style={{marginRight: '1.5vh', backgroundImage: 'url(' + Matin1 + ')'}}>
                </div>
                <div className={postUpload.previewImageWrapper} style={{marginRight: '1.5vh', border: '0.3vh solid #454545'}}>
                </div>
                <div className={postUpload.previewImageWrapper} style={{border: '0.3vh solid #f2f1ed', fontFamily: 'WaitingfortheSunrise', color: '#F2F1ED'}}>
                    add
                </div>
            </div>
            <div className={postUpload.previewImageList}>
                <div className={postUpload.previewImageWrapper} style={{marginRight: '1.5vh', height: '1.5vh', border: '0.3vh solid #454545'}}>
                </div>
                <div className={postUpload.previewImageWrapper} style={{marginRight: '1.5vh', height: '1.5vh', border: '0.3vh solid #454545'}}>
                </div>
                <div className={postUpload.previewImageWrapper} style={{border: '0.3vh solid #454545',  height: '1.5vh'}}>
                </div>
            </div>
        </div>
    );
}

export default PostUpload;