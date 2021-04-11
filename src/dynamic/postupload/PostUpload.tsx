import React, { useEffect, useState, useRef } from 'react';

import {
    Page,
    POST_UPLOAD,
    EMPTY_STRING,
    EMPTY_BLOCK,
    ADD_BLOCK,
    FILLED_BLOCK,
    CANVAS_MAX_SIZE
} from '../../const/Constant';

import FrontView from './FrontView';
import ImageCropper from './ImageCropper';

import { fromURL } from 'image-resize-compress';

import postUpload from '../../static/css/postupload/postUpload.module.css';
import ImageUploader from './ImageUploader';

type ImageSize = {
    width: number,
    height: number
};

type GetImageSize = (rawImagePath: string) => Promise<ImageSize>;

type Area = {
    width: number,
    height: number,
    x: number,
    y: number,
};

type PostUploadProps = {
    pageDidMount: (page: Page) => void
};

function PostUpload({ pageDidMount }: PostUploadProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const fileRef = useRef<HTMLInputElement>(null);

    const [viewIndex, setViewIndex] = useState(0);

    const [vibeList, setVibeList] = useState(['가까운']);
    const [vibeIndex, setVibeIndex] = useState(0);

    const [shrinkFloor, setShrinkFloor] = useState(-1);

    const [block1, setBlock1] = useState(EMPTY_BLOCK);
    const [block2, setBlock2] = useState(EMPTY_BLOCK);
    const [block3, setBlock3] = useState(EMPTY_BLOCK);
    const [block4, setBlock4] = useState(EMPTY_BLOCK);
    const [block5, setBlock5] = useState(EMPTY_BLOCK);
    const [block6, setBlock6] = useState(EMPTY_BLOCK);

    const blockList: number[] = [
        block1, block2, block3,
        block4, block5, block6
    ];

    const blockSetterList: React.Dispatch<React.SetStateAction<number>>[] = [
        setBlock1, setBlock2, setBlock3,
        setBlock4, setBlock5, setBlock6
    ];

    const [imagePath1, setImagePath1] = useState(EMPTY_STRING);
    const [imagePath2, setImagePath2] = useState(EMPTY_STRING);
    const [imagePath3, setImagePath3] = useState(EMPTY_STRING);
    const [imagePath4, setImagePath4] = useState(EMPTY_STRING);
    const [imagePath5, setImagePath5] = useState(EMPTY_STRING);
    const [imagePath6, setImagePath6] = useState(EMPTY_STRING);

    const imagePathList: string[] = [
        imagePath1, imagePath2, imagePath3,
        imagePath4, imagePath5, imagePath6
    ];

    const imagePathSetterList: React.Dispatch<React.SetStateAction<string>>[] = [
        setImagePath1, setImagePath2, setImagePath3,
        setImagePath4, setImagePath5, setImagePath6
    ];

    const [currentImagePath, setCurrentImagePath] = useState(EMPTY_STRING);

    const [croppedAreaPixels1, setCroppedAreaPixels1] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [croppedAreaPixels2, setCroppedAreaPixels2] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [croppedAreaPixels3, setCroppedAreaPixels3] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [croppedAreaPixels4, setCroppedAreaPixels4] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [croppedAreaPixels5, setCroppedAreaPixels5] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [croppedAreaPixels6, setCroppedAreaPixels6] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });

    const croppedAreaPixelsList: Area[] = [
        croppedAreaPixels1, croppedAreaPixels2, croppedAreaPixels3,
        croppedAreaPixels4, croppedAreaPixels5, croppedAreaPixels6
    ];

    const croppedAreaPixelsSetterList: React.Dispatch<React.SetStateAction<Area>>[] = [
        setCroppedAreaPixels1, setCroppedAreaPixels2, setCroppedAreaPixels3,
        setCroppedAreaPixels4, setCroppedAreaPixels5, setCroppedAreaPixels6
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    function blockTouchEvent(blockIndex: number, blockType: number) {
        setCurrentIndex(blockIndex);

        if (blockType === FILLED_BLOCK) {
            assignEmptyBlock(blockIndex);
        }
        else if (blockType === ADD_BLOCK) {
            fileRef.current?.click();
        }
    }

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

        if (length === 1) {
            const rawImagePath =
                (window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(0));

            const rawImageSize: ImageSize = await getImageSize(rawImagePath);

            const width: number = rawImageSize.width;
            const height: number = rawImageSize.height;

            if (width > CANVAS_MAX_SIZE || height > CANVAS_MAX_SIZE) {
                let resized: Blob = new Blob();

                if (width > height)
                    resized = await fromURL(rawImagePath, 100, CANVAS_MAX_SIZE, 'auto', 'jpeg');
                else
                    resized = await fromURL(rawImagePath, 100, 'auto', CANVAS_MAX_SIZE, 'jpeg');

                const resizedImagePath = 
                    (window.URL || window.webkitURL).createObjectURL(resized);

                imagePathSetterList[currentIndex](resizedImagePath);
                setCurrentImagePath(resizedImagePath);
            }
            else {
                imagePathSetterList[currentIndex](rawImagePath);
                setCurrentImagePath(rawImagePath);
            }

            setViewIndex(1);
        }
    }

    function setCroppedAreaPixels(croppedAreaPixels: Area) {
        croppedAreaPixelsSetterList[currentIndex](croppedAreaPixels);
    }

    const [filledBlockCount, setFilledBlockCount] = useState(0);

    function captureCroppedAreaPixels() {
        setViewIndex(0);

        blockSetterList[currentIndex](FILLED_BLOCK);

        setFilledBlockCount(filledBlockCount + 1);

        if (filledBlockCount + 1 < 3)
            assignAddBlock(currentIndex, -1);
        
        setBlink(!blink);
    }

    function makeRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [blink, setBlink] = useState(false);

    function assignEmptyBlock(emptyBlockIndex: number) {
        setBlink(!blink);

        blockSetterList[emptyBlockIndex](EMPTY_BLOCK);

        if (filledBlockCount === 3) {
            assignAddBlock(-1, emptyBlockIndex);
        }
        else {
            let count: number[] = [0, 0];

            for (let i = 0; i < 6; i++)
                if (blockList[i] === FILLED_BLOCK || blockList[i] === ADD_BLOCK)
                    count[Math.floor(i / 3)]++;

            count[Math.floor(emptyBlockIndex / 3)]--;

            setShrinkFloor(count[0] === 0 ? 0 : count[1] === 0 ? 1 : -1);
        }

        setFilledBlockCount(filledBlockCount - 1);
    }

    function assignAddBlock(filledBlockIndex: number = -1, emptyBlockIndex: number = -1) {
        let blockIndex: number;

        while (true) {
            blockIndex = makeRandom(0, 5);
            if (blockList[blockIndex] !== FILLED_BLOCK) {
                if (filledBlockIndex === -1)
                    break;
                else if (filledBlockIndex !== blockIndex)
                    break;
            }
            else if (emptyBlockIndex !== -1 && blockIndex === emptyBlockIndex) {
                break;
            }
        }

        let count: number[] = [0, 0];

        if (filledBlockIndex !== -1)
            count[Math.floor(filledBlockIndex / 3)]++;

        if (emptyBlockIndex !== -1)
            count[Math.floor(emptyBlockIndex / 3)]--;

        for (let i = 0; i < 6; i++)
            if (blockList[i] === FILLED_BLOCK)
                count[Math.floor(i / 3)]++;

        count[Math.floor(blockIndex / 3)]++;

        setShrinkFloor(count[0] === 0 ? 0 : count[1] === 0 ? 1 : -1);

        blockSetterList[blockIndex](ADD_BLOCK);
    }

    useEffect(() => {
        if (!isLoaded) {
            const additional = ['데이트하기 좋은', '공부하기 좋은'];

            setVibeList([...vibeList, ...additional]);

            assignAddBlock();

            setIsLoaded(true);

            pageDidMount(POST_UPLOAD);
        }
    }, []);

    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        setIsEnabled(filledBlockCount > 0 ? true : false);
    }, [filledBlockCount]);


    const [rawCroppedAreaPixels, setRawCroppedAreaPixels] = useState<Area[]>([]);
    const [rawImagePathList, setRawImagePathList] = useState<string[]>([]);

    function getNextView() {
        const croppedAreaPixels: Area[] = [];
        const rawImagePathList: string[] = [];

        for (let i = 0; i < 6; i++) {
            if (blockList[i] === FILLED_BLOCK) {
                croppedAreaPixels.push(croppedAreaPixelsList[i]);
                rawImagePathList.push(imagePathList[i]);
            }
        }

        setRawCroppedAreaPixels(croppedAreaPixels);
        setRawImagePathList(rawImagePathList);

        setViewIndex(2);
    }

    return (
        <div className={postUpload.wrapper}>
            <input ref={fileRef}
                type="file"
                accept="image/*"
                capture="camera"
                style={{ display: 'none' }}
                multiple={true}
                onChange={(e) => onChange(e)} />
            {viewIndex === 0 ?
                <FrontView
                    blink={blink}
                    isEnabled={isEnabled}
                    vibeIndex={vibeIndex}
                    vibeList={vibeList}
                    shrinkFloor={shrinkFloor}
                    imagePathList={imagePathList}
                    blockList={blockList}
                    blockTouchEvent={blockTouchEvent}
                    setVibeIndex={setVibeIndex}
                    getNextView={getNextView}
                /> :
                <></>}
            {viewIndex === 1 ?
                <ImageCropper
                    imagePath={currentImagePath}
                    captureCroppedAreaPixels={captureCroppedAreaPixels}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                /> :
                <></>}
            {viewIndex === 2 ?
                <ImageUploader 
                    rawImagePathList={rawImagePathList} 
                    croppedAreaPixelsList={rawCroppedAreaPixels} 
                /> :
                <></>}
        </div>
    );
}

export default PostUpload;