import React, { useState, useEffect } from 'react';
import getCroppedImg from './CropImage';

import TagList from './TagList';
import { ImageList, ImageListSkeleton } from './ImageList';

import { EMPTY_STRING, ENTER_KEY, RESET_ICON } from '../../const/Constant';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageUploader from '../../static/css/postupload/imageUploader.module.css';

type Tag = {
    name: string,
    count: number
};

type Area = {
    width: number,
    height: number,
    x: number,
    y: number
};

type ImageUploaderProps = {
    rawImageList: string[],
    croppedAreaPixelsList: Area[]
};

function ImageUploader({
    rawImageList,
    croppedAreaPixelsList }: ImageUploaderProps) {

    const [toggle, setToggle] = useState(false);

    const [input, setInput] = useState(EMPTY_STRING);
    const [isWritten, setIsWritten] = useState(false);
    const [tagList, setTagList] = useState<Tag[]>([]);

    const imageCount: number = croppedAreaPixelsList.length;

    const [imagePath1, setImagePath1] = useState('');
    const [imagePath2, setImagePath2] = useState('');
    const [imagePath3, setImagePath3] = useState('');

    const imagePathSetterList:
        React.Dispatch<React.SetStateAction<string>>[] =
        [setImagePath1, setImagePath2, setImagePath3];

    const [imageToggle1, setImageToggle1] = useState(false);
    const [imageToggle2, setImageToggle2] = useState(false);
    const [imageToggle3, setImageToggle3] = useState(false);

    const imageToggleSetterList:
        React.Dispatch<React.SetStateAction<boolean>>[] =
        [setImageToggle1, setImageToggle2, setImageToggle3];

    const [imageListToggle, setImageListToggle] = useState(false);

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

    async function ShowCroppedImage(
        imageIndex: number,
        imagePath: string,
        croppedAreaPixels: Area) {
        try {
            let croppedImage: string = await getCroppedImg(
                imagePath,
                croppedAreaPixels,
                0
            );
            imagePathSetterList[imageIndex](croppedImage);
            imageToggleSetterList[imageIndex](true);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        croppedAreaPixelsList.map((croppedAreaPixels, imageIndex) => {
            ShowCroppedImage(imageIndex, rawImageList[imageIndex], croppedAreaPixels);
        });
    }, []);

    useEffect(() => {
        let count = 0;
        if (imageToggle1)
            count++;
        if (imageToggle2)
            count++;
        if (imageToggle3)
            count++;
        if (count === imageCount)
            setImageListToggle(true);
    }, [imageToggle1, imageToggle2, imageToggle3])

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
                        <input className={imageUploader.textInput} placeholder="리뷰" />
                        <input className={imageUploader.textAppend} value="🍰" readOnly />
                    </div>
                    {imageListToggle ? 
                        <ImageList imagePathList={[imagePath1, imagePath2, imagePath3]} /> : 
                        <ImageListSkeleton /> 
                    }
                    <div className={imageUploader.previewImageList}>
                        {imageToggle1 ? 
                            <PreviewImage 
                                imageIndex={0} 
                                imagePath={imagePath1} 
                            /> : 
                            <PreviewImageSkeleton imageIndex={0} />
                        }
                        {imageToggle2 ? 
                            <PreviewImage 
                                imageIndex={1} 
                                imagePath={imagePath2} 
                            /> : 
                            <PreviewImageSkeleton imageIndex={1} />
                        }
                        {imageToggle3 ? 
                            <PreviewImage 
                                imageIndex={2} 
                                imagePath={imagePath3} /> :
                            <PreviewImageSkeleton imageIndex={2} />
                        }
                    </div>
                </div>
            }
        </div>
    );
}

type PreviewImageSkeletonProps = {
    imageIndex: number
}

function PreviewImageSkeleton({ imageIndex }: PreviewImageSkeletonProps) {
    return (
        <div className={imageUploader.previewImageWrapper}
            style={{ marginRight: imageIndex < 2 ? '1.5vh' : '0' }}>
            <div style={{color: '#333333'}}>{imageIndex + 1}</div>
        </div>
    );
}

type PreviewImageProps = {
    imageIndex: number,
    imagePath: string
};

function PreviewImage({
    imageIndex,
    imagePath }: PreviewImageProps) {

    return (
        <div className={classNames([imageUploader.previewImageWrapper, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')', marginRight: imageIndex < 2 ? '1.5vh' : '0' }}>
            <div className={imageUploader.previewImage}>
                <div>{imageIndex + 1}</div>
            </div>
        </div>
    );
}

export default ImageUploader;