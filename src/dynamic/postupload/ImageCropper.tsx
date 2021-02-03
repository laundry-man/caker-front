import React, { useState } from 'react';

import Cropper from 'react-easy-crop';

import imageCropper from '../../static/css/postupload/imageCropper.module.css';

type ImageCropperProps = {
    imagePath: string
}

function ImageCropper({ imagePath }: ImageCropperProps) {
    const [coordinates, setCoordinate] = useState({ x: 0, y: 0 });
    const [zoomRatio, setZoomRatio] = useState(1);

    return (
        <>
            <div className={imageCropper.imageCropper}>
                <div className={imageCropper.dotWrapper}>
                    <div className={imageCropper.dot}>●</div>
                </div>
                <Cropper image={imagePath}
                    crop={coordinates}
                    zoom={zoomRatio}
                    aspect={1}
                    onCropChange={setCoordinate}
                    onZoomChange={setZoomRatio}
                    onCropComplete={(croppedArea, croppedAreaPixels) => {
                        console.log(croppedArea); 
                        console.log(croppedAreaPixels);
                    }}
                    style={{
                        cropAreaStyle: { border: 'none' }
                    }}>
                </Cropper>
            </div>
        </>
    );
}

export default ImageCropper;