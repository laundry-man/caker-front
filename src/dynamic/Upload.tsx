import React, { useState } from 'react';

import Cropper from 'react-easy-crop';

import '../static/css/upload.css';

import Tux from '../static/image/Tux.png';
import Matin1 from '../static/image/matin_1.png';
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
        <PullToRefresh
            onRefresh={getNewData}
            canFetchMore={true}
            isPullable={false}
            fetchMoreThreshold={0}
            pullDownThreshold={67}
            maxPullDownDistance={95}
            className={"pull-to-refresh fade-in-fast"}>
            <div className="caker-container">
                <Cropper image={Matin1}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    showGrid={false}
                    style={{ 
                        containerStyle: { position: 'relative', width: '80vw', height: '80vw' }, 
                        mediaStyle: { width: '80vw' }, 
                        cropAreaStyle: { borderRadius: '5px', border: 'none' } 
                        }}>
                </Cropper>
                <div style={{ width: '80vw', height: '80vw' }}>
                    <Front></Front>
                    <Front></Front>
                </div>
            </div>
        </PullToRefresh>
    );
}

export default Upload;