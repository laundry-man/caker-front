import React, { useState } from 'react';

import Cropper from 'react-easy-crop';

import { ActiveViewProps } from '../const/Type';

function ImageView({ path }: ActiveViewProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    return (
        <>
            <div className="cropper">
                <div className="inverse-dot-wrapper">
                    <div className="inverse-dot">●</div>
                </div>
                <Cropper image={path}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(croppedArea, croppedAreaPixels) => {console.log(croppedArea); console.log(croppedAreaPixels);}}
                    style={{
                        cropAreaStyle: { border: 'none' }
                    }}>
                </Cropper>
            </div>
        </>
    );
}

export default ImageView;