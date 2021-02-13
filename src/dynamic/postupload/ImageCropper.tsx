import React, { useState, useCallback } from 'react';

import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImage';

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import imageCropper from '../../static/css/postupload/imageCropper.module.css';

type ImageCropperProps = {
    imagePath: string
};

type Area = {
    width: number;
    height: number;
    x: number;
    y: number;
};

function ImageCropper({ imagePath }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    const [croppedImage, setCroppedImage] = useState();

    const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
        await showCroppedImage();
    };

    const showCroppedImage = async () => {
        try {
          const croppedImage = await getCroppedImg(
            imagePath,
            croppedAreaPixels,
            0
          )
          console.log('donee', { croppedImage });
          setCroppedImage(croppedImage);
        } catch (e) {
          console.error(e);
        }
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
                onCropComplete={onCropComplete}
                style={{
                    cropAreaStyle: { border: 'none' }
                }}>
            </Cropper>
        </div>
    );
}

export default ImageCropper;