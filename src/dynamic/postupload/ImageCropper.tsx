import React, { useState, useEffect } from 'react';

import Cropper from 'react-easy-crop';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageCropper from '../../static/css/postupload/imageCropper.module.css';

type Area = {
    width: number,
    height: number,
    x: number,
    y: number,
};

type ImageCropperProps = {
    imageIndex: number,
    rawImageList: string[],
    setCroppedAreaPixels: (imageIndex: number, croppedAreaPixels: Area) => void
};

function ImageCropper({ 
    imageIndex, 
    rawImageList, 
    setCroppedAreaPixels }: ImageCropperProps) {

    const imagePath: string = rawImageList[imageIndex];

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    function OnCropComplete(croppedArea: Area, croppedAreaPixels: Area) {
        setCroppedAreaPixels(imageIndex, croppedAreaPixels);
    };

    return (
        <div className={classNames([imageCropper.imageCropper, index.fadeInSlow])}>
            <div className={imageCropper.dotWrapper}>
                <div className={imageCropper.dot}>●</div>
            </div>
            <Cropper image={imagePath}
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

export default ImageCropper;