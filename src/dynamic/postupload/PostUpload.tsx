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

import { blobToURL, fromURL } from 'image-resize-compress';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import postUpload from '../../static/css/postupload/postUpload.module.css';

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

    const [currentImagePath, setCurrentImagePath] = useState(EMPTY_STRING);

    const imagePathList: string[] = [
        EMPTY_STRING, EMPTY_STRING, EMPTY_STRING,
        EMPTY_STRING, EMPTY_STRING, EMPTY_STRING
    ];

    const croppedAreaPixelsList: Area[] = [
        { width: 0, height: 0, x: 0, y: 0 }, { width: 0, height: 0, x: 0, y: 0 }, { width: 0, height: 0, x: 0, y: 0 },
        { width: 0, height: 0, x: 0, y: 0 }, { width: 0, height: 0, x: 0, y: 0 }, { width: 0, height: 0, x: 0, y: 0 }
    ];

    let currentIndex: number;

    function blockTouchEvent(blockIndex: number, blockType: number) {
        currentIndex = blockIndex;

        if (blockType === FILLED_BLOCK) {
            blockSetterList[blockIndex](EMPTY_BLOCK);
            assignAddBlock();
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

                const resizedImagePath = await blobToURL(resized);

                imagePathList[currentIndex] = resizedImagePath;
            }
            else {
                imagePathList[currentIndex] = rawImagePath;
            }

            setCurrentImagePath(imagePathList[currentIndex]);

            setViewIndex(1);
        }
    }

    function setCroppedAreaPixels(croppedAreaPixels: Area) {
        croppedAreaPixelsList[currentIndex] = croppedAreaPixels;
    }

    function makeRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 해당 메서드는 채워진 이미지 수가 3개 미만일 때 호출한다.
    function assignAddBlock() {
        let blockIndex: number;

        while (blockList[(blockIndex = makeRandom(0, 5))] === FILLED_BLOCK);

        let count: number[] = [0, 0];

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

    return (
        <div className={classNames([postUpload.wrapper, index.fadeInSlow])}>
            <input ref={fileRef}
                type="file"
                accept="image/*"
                capture="camera"
                style={{ display: 'none' }}
                multiple={true}
                onChange={(e) => onChange(e)} />
            <FrontView
                viewIndex={viewIndex}
                vibeIndex={vibeIndex}
                vibeList={vibeList}
                shrinkFloor={shrinkFloor}
                blockList={blockList}
                blockTouchEvent={blockTouchEvent}
                setVibeIndex={setVibeIndex}
            />
            <ImageCropper
                viewIndex={viewIndex}
                imagePath={currentImagePath}
                setCroppedAreaPixels={setCroppedAreaPixels}
            />
        </div>
    );
}

export default PostUpload;