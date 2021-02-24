import React, { useState, useEffect, useRef } from 'react';
import getCroppedImg from './CropImage';

import TagList from './TagList';
import { ImageList, ImageListSkeleton } from './ImageList';

import { EMPTY_STRING, ENTER_KEY, RESET_ICON, COMMENT_MAX_WIDTH, A_PIECE_OF_CAKE } from '../../const/Constant';

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

    const imageCount: number = croppedAreaPixelsList.length;

    const [toggle, setToggle] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const [tagInput, setTagInput] = useState(EMPTY_STRING);
    const [isWritten, setIsWritten] = useState(false);
    const [tagList, setTagList] = useState<Tag[]>([]);

    const [imageOrder1, setImageOrder1] = useState(0);
    const [imageOrder2, setImageOrder2] = useState(1);
    const [imageOrder3, setImageOrder3] = useState(2);

    const imageOrderList: number[] = [imageOrder1, imageOrder2, imageOrder3];
    const imageOrderSetterList:
        React.Dispatch<React.SetStateAction<number>>[] =
        [setImageOrder1, setImageOrder2, setImageOrder3];

    const [isDisabled1, setIsDisabled1] = useState(true);
    const [isDisabled2, setIsDisabled2] = useState(true);
    const [isDisabled3, setIsDisabled3] = useState(true);

    const isDisabledList: boolean[] = [isDisabled1, isDisabled2, isDisabled3];
    const isDisabledSetterList:
        React.Dispatch<React.SetStateAction<boolean>>[] =
        [setIsDisabled1, setIsDisabled2, setIsDisabled3];

    const [imagePath1, setImagePath1] = useState(EMPTY_STRING);
    const [imagePath2, setImagePath2] = useState(EMPTY_STRING);
    const [imagePath3, setImagePath3] = useState(EMPTY_STRING);

    const imagePathList: string[] = [imagePath1, imagePath2, imagePath3];
    const imagePathSetterList:
        React.Dispatch<React.SetStateAction<string>>[] =
        [setImagePath1, setImagePath2, setImagePath3];

    const [imagePathListParam, setImagePathListParam] = useState<string[]>([]);

    const [imageToggle1, setImageToggle1] = useState(false);
    const [imageToggle2, setImageToggle2] = useState(false);
    const [imageToggle3, setImageToggle3] = useState(false);

    const imageToggleList: boolean[] = [imageToggle1, imageToggle2, imageToggle3];
    const imageToggleSetterList:
        React.Dispatch<React.SetStateAction<boolean>>[] =
        [setImageToggle1, setImageToggle2, setImageToggle3];

    const [imageListToggle, setImageListToggle] = useState(false);
    const [renderingToggle, setRenderingToggle] = useState(false);

    const [commentInput, setCommentInput] = useState(EMPTY_STRING);
    const [splitComment, setSplitComment] = useState<string[]>([]);
    const [cakeRating, setCakeRating] = useState(1);

    const [rearrange, setRearrange] = useState(0);

    function getCurrentImagePathList() {
        const _imagePathList: string[] = [];
        for (let i = 0; i < imageCount; i++)
            if (imageToggleList[i])
                _imagePathList.push(imagePathList[i]);
        return _imagePathList;
    }

    function attachHashtag(tag: string) {
        return '#' + tag.toLowerCase();
    }

    function detachHashtag(tag: string) {
        return tag.replace('#', EMPTY_STRING);
    }

    function startSearch() {
        if (!toggle) {
            setTagInput(EMPTY_STRING);
            setTagList([]);
            setIsWritten(false);
            setToggle(true);
        }
    }

    function writeComment() {
        setRearrange(rearrange === 2 ? 1 : rearrange + 1);
        setRenderingToggle(!renderingToggle);
    }

    function assignComment(e: React.ChangeEvent<HTMLInputElement>) {
        let comment: string = e.target.value;
        let split: string[] = splitCommentByApproximateWidth(comment);
        setSplitComment(split);
        setCommentInput(split.join(''));
    }

    function splitCommentByApproximateWidth(comment: string) {
        let split: string[] = [];
        let width: number = 0;
        let line: string = EMPTY_STRING;
        for (let i = 0, j = 0; (j = comment.charCodeAt(i)) && split.length < 3; i++) {
            const charWidth: number = j >> 11 ? 3 : j >> 7 ? 3 : 1.75;
            if (Math.ceil(width + charWidth) > COMMENT_MAX_WIDTH) {
                split.push(line);
                line = comment[i];
                width = charWidth;
            } else {
                width += charWidth;
                line += comment[i];
            }
        }
        if (split.length < 3 && line !== EMPTY_STRING)
            split.push(line);
        return split;
    }

    function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === EMPTY_STRING) {
            setTagInput(EMPTY_STRING);
            setIsWritten(false);
        }
        else {
            setTagInput(e.target.value);
            findTagByKeyword(e.target.value, setTagList);
            setIsWritten(true);
        }
    };

    function selectKeyword(tag: string) {
        setTagInput(detachHashtag(tag));
        setToggle(false);
    }

    function submitKeyword(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === ENTER_KEY)
            setToggle(false);
    }

    function clearKeyword() {
        if (isWritten) {
            setTagInput(EMPTY_STRING);
            setTagList([]);
            setIsWritten(false);
        }
    }

    function changeImageOrder(imageIndex: number) {
        let count = imageCount;
        for (let i = 0; i < imageCount; i++)
            count -= isDisabledList[i] ? 1 : 0;
        if (count === 3) {
            for (let i = 0, j = 0; i < 3; i++) {
                imageOrderSetterList[i](imageIndex === i ? 0 : ++j);
                isDisabledSetterList[i](imageIndex === i ? false : true);
            }
        }
        else if (count === 2) {
            for (let i = 0; i < 2; i++) {
                imageOrderSetterList[i](imageIndex === i ? 0 : 1);
            }
        }
        else if (count === 1 && isDisabledList[imageIndex]) {
            for (let i = 0; i < 3; i++) {
                if (isDisabledList[i]) {
                    imageOrderSetterList[i](imageIndex === i ? 1 : 2);
                    isDisabledSetterList[i](false);
                }
            }
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
            isDisabledSetterList[imageIndex](false);
        } catch (e) {
            console.error(e);
        }
    };

    async function findTagByKeyword(keyword: string, callback: React.Dispatch<React.SetStateAction<Tag[]>>) {
        const array: Tag[] = [];
        const response = await fetch(
            `http://localhost:9100/api/tag/${encodeURIComponent(keyword)}?lang=ko`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTYxNDE3NzY4NywiZXhwIjoxNjE0MTgxMjg3fQ.tBLZi1E3FBckeWbz9YXTMAWQlA2q3cYt_sBoi_mHJ8g'
                }
            });
        const { data, errors } = await response.json();
        if (response.ok)
            for (let i = 0; i < data.length; i++)
                array.push({ name: attachHashtag(data[i].name), count: 99 });
        callback(array);
    }

    useEffect(() => {
        croppedAreaPixelsList.map((croppedAreaPixels, imageIndex) => {
            ShowCroppedImage(imageIndex, rawImageList[imageIndex], croppedAreaPixels);
        });
    }, []);

    useEffect(() => {
        let count = 0;
        for (let i = 0; i < imageCount; i++)
            count += imageToggleList[i] ? 1 : 0;
        if (count === imageCount) {
            const _imagePathList = getCurrentImagePathList();
            setImagePathListParam([_imagePathList[0], ..._imagePathList]);
            setImageListToggle(true);
        }
    }, [imageToggle1, imageToggle2, imageToggle3]);

    useEffect(() => {
        if (imageListToggle) {
            const _imagePathList = getCurrentImagePathList();
            for (let i = 0; i < imageCount; i++)
                _imagePathList[imageOrderList[i]] = imagePathList[i];
            if (rearrange > 0)
                setRearrange(0);
            setImagePathListParam([_imagePathList[0], ..._imagePathList]);
            setRenderingToggle(!renderingToggle);
        }
    }, [imageListToggle, imageOrder1, imageOrder2, imageOrder3]);

    useEffect(() => {
        if (tagInput !== EMPTY_STRING && commentInput !== EMPTY_STRING)
            setIsEnabled(true);
        else
            setIsEnabled(false);
    }, [tagInput, commentInput]);

    return (
        <div className={classNames([imageUploader.uploader, index.fadeInSlow])}>
            <div className={imageUploader.searchWrapper}>
                <input className={imageUploader.searchPrepend} value="#" readOnly />
                <input className={imageUploader.searchInput}
                    placeholder="태그"
                    value={tagInput}
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
                        <input className={imageUploader.textInput}
                            placeholder="리뷰"
                            value={commentInput}
                            onClick={writeComment}
                            onChange={(e) => assignComment(e)} />
                        <input className={imageUploader.textAppend}
                            value={A_PIECE_OF_CAKE}
                            onClick={() => setCakeRating(cakeRating === 3 ? 1 : cakeRating + 1)}
                            readOnly />
                    </div>
                    {imageListToggle ?
                        <ImageList
                            key={renderingToggle ? 1 : 0}
                            rearrange={rearrange}
                            splitComment={splitComment}
                            cakeRating={cakeRating}
                            imagePathList={imagePathListParam}
                        /> :
                        <ImageListSkeleton />
                    }
                    <div className={imageUploader.previewImageList}>
                        {imageToggle1 ?
                            <PreviewImage
                                isDisabled={isDisabled1}
                                imageIndex={0}
                                imageOrder={imageOrder1}
                                imagePath={imagePath1}
                                changeImageOrder={changeImageOrder}
                            /> :
                            <PreviewImageSkeleton imageIndex={0} />
                        }
                        {imageToggle2 ?
                            <PreviewImage
                                isDisabled={isDisabled2}
                                imageIndex={1}
                                imageOrder={imageOrder2}
                                imagePath={imagePath2}
                                changeImageOrder={changeImageOrder}
                            /> :
                            <PreviewImageSkeleton imageIndex={1} />
                        }
                        {imageToggle3 ?
                            <PreviewImage
                                isDisabled={isDisabled3}
                                imageIndex={2}
                                imageOrder={imageOrder3}
                                imagePath={imagePath3}
                                changeImageOrder={changeImageOrder}
                            /> :
                            <PreviewImageSkeleton imageIndex={2} />
                        }
                    </div>
                    <div className={imageUploader.uploadButtonWrapper}>
                        {isEnabled ?
                            <div className={classNames([imageUploader.uploadButton, index.fadeInFast])}
                                onClick={() => { }}>
                                commit
                            </div> :
                            <></>
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
            <div className={imageUploader.previewImage}>
                <div style={{ color: '#454545' }}>{imageIndex + 1}</div>
            </div>
        </div>
    );
}

type PreviewImageProps = {
    isDisabled: boolean,
    imageIndex: number,
    imageOrder: number,
    imagePath: string,
    changeImageOrder: (imageIndex: number) => void
};

function PreviewImage({
    isDisabled,
    imageIndex,
    imageOrder,
    imagePath,
    changeImageOrder }: PreviewImageProps) {

    return (
        <div className={classNames([imageUploader.previewImageWrapper, index.fadeInFast])}
            style={{ backgroundImage: 'url(' + imagePath + ')', marginRight: imageIndex < 2 ? '1.5vh' : '0' }}
            onClick={() => changeImageOrder(imageIndex)}>
            <div className={imageUploader.previewImage}>
                <div className={isDisabled ?
                    imageUploader.previewImageDisabled :
                    imageUploader.previewImageEnabled}>
                    {imageOrder + 1}
                </div>
            </div>
        </div>
    );
}

export default ImageUploader;