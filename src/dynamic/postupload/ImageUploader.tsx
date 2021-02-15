import React, { useState, useEffect } from 'react';
import getCroppedImg from './CropImage';

import TagList from './TagList';
import ImageList from './ImageList';

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

    const [imagePath1, setImagePath1] = useState('');
    const [imagePath2, setImagepath2] = useState('');
    const [imagePath3, setImagePath3] = useState('');

    const imagePathSetterList:
        React.Dispatch<React.SetStateAction<string>>[] =
            [setImagePath1, setImagepath2, setImagePath3];

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
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        croppedAreaPixelsList.map((croppedAreaPixels, imageIndex) => {
            ShowCroppedImage(imageIndex, rawImageList[imageIndex], croppedAreaPixels);
        });
    }, [])

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
                        <input className={imageUploader.textInput} placeholder="평가" />
                        <input className={imageUploader.textAppend} readOnly />
                    </div>
                    <ImageList />
                    <div className={imageUploader.previewWrapper}>
                        <div className={imageUploader.preview} style={{ backgroundImage: 'url(' + imagePath1 + ')', marginRight: '1.5vh' }} />
                        <div className={imageUploader.preview} style={{ backgroundImage: 'url(' + imagePath2 + ')', marginRight: '1.5vh' }} />
                        <div className={imageUploader.preview} style={{ backgroundImage: 'url(' + imagePath3 + ')' }} />
                    </div>
                </div>
            }
        </div>
    );
}

export default ImageUploader;