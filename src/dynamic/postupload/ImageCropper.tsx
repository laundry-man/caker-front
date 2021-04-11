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
    viewIndex: number,
    imagePath: string,
    captureCroppedAreaPixels: () => void,
    setCroppedAreaPixels: (croppedAreaPixels: Area) => void
};

function ImageCropper({ 
    viewIndex,
    imagePath, 
    captureCroppedAreaPixels,
    setCroppedAreaPixels }: ImageCropperProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    function OnCropComplete(croppedArea: Area, croppedAreaPixels: Area) {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
        <div className={viewIndex === 1 ? classNames([imageCropper.imageCropper, index.fadeInSlow]) : index.nonDisplay}
             onClick={() => captureCroppedAreaPixels()}>
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