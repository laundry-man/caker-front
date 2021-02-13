import React, { useState, useEffect } from 'react';

import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImage';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageCropper from '../../static/css/postupload/imageCropper.module.css';

type Area = {
    width: number;
    height: number;
    x: number;
    y: number;
};

type ImageCropperProps = {
    imageIndex: number;
    croppedImageList: string[];
    setCroppedImageList: React.Dispatch<React.SetStateAction<string[]>>;
};

function sleep(ms: number) {
    const wakeUpTime = Date.now() + ms
    while (Date.now() < wakeUpTime) {}
}

function ImageCropper({ 
    imageIndex, 
    croppedImageList, 
    setCroppedImageList }: ImageCropperProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    let croppedAreaPixels: Area = {width: 0, height: 0, x: 0, y: 0};
    let count: number = 1;

    function OnCropComplete(croppedArea: Area, _croppedAreaPixels: Area) {
        croppedAreaPixels = _croppedAreaPixels;
        console.log(croppedAreaPixels);
    };

    async function ShowCroppedImage() {
        try {
            console.log(count++);
            console.log(croppedAreaPixels);
            let _length: number = croppedImageList.length;
            let _croppedImageList: string[] = [];
            let _croppedImage: string = await getCroppedImg(
                croppedImageList[imageIndex],
                croppedAreaPixels,
                0
            );
            console.log(_croppedImage);
            for (let i = 0; i < _length; i++)
                _croppedImageList.push(imageIndex === i ? _croppedImage : croppedImageList[i]);
            setCroppedImageList(_croppedImageList);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        return () => {
            ShowCroppedImage();
            sleep(10000);
        };
    }, []);

    return (
        <div className={classNames([imageCropper.imageCropper, index.fadeInSlow])}>
            <div className={imageCropper.dotWrapper}>
                <div className={imageCropper.dot}>●</div>
            </div>
            <Cropper image={croppedImageList[imageIndex]}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={
                    (croppedArea, croppedAreaPixels) => OnCropComplete(croppedArea, croppedAreaPixels)
                }
                style={{
                    cropAreaStyle: { border: 'none' }
                }}>
            </Cropper>
        </div>
    );
}

export default React.memo(ImageCropper);