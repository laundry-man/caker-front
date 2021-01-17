import React, { useEffect, useState } from 'react';

import Cropper from 'react-easy-crop';

import '../static/css/upload.css';

import Tux from '../static/image/Tux.png';
import Matin1 from '../static/image/matin_1.png';
import BrownHands3 from '../static/image/brownhands_3.png';
import Terarosa1 from '../static/image/terarosa_1.png';
import Anthracite1 from '../static/image/anthracite_1.png';
import PullToRefresh from 'react-simple-pull-to-refresh';

function Front() {
    return (
        <div className="upload-button fade-in-slow">
            <div className="upload-button-content-1">please</div>
            <div className="upload-button-content-2">touch</div>
            <div className="upload-button-content-3">me.</div>
            <img className="upload-button-content-4" src={Tux} alt=""></img>
        </div>
    );
}

function Upload() {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const getNewData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    const resetData = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    return (
        <div className="upload-wrapper">
            <div className="inverse-dot-wrapper">
                <div className="inverse-dot">●</div>
            </div>
            <Cropper image={BrownHands3}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                showGrid={true}
                style={{
                    cropAreaStyle: { border: 'none' }
                }}>
            </Cropper>
        </div>
    );
}

export default Upload;