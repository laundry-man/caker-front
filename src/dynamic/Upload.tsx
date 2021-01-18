import React, { useEffect, useRef, useState } from 'react';

import Cropper from 'react-easy-crop';

import '../static/css/upload.css';

import PullToRefresh from 'react-simple-pull-to-refresh';

import Tux from '../static/image/Tux.png';
import PotatoField2 from '../static/image/potatofield_2.png';

function Upload() {
    const [toggle, setToggle] = useState(false);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const fileRef = useRef<HTMLInputElement>(null);

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

    const uploadFiles = () => {
        fileRef.current?.click();
    }

    function Front() {
        return (
            <div className="upload-button fade-in-slow">
                <div className="upload-button-content-1">please</div>
                <div className="upload-button-content-2">touch</div>
                <div className="upload-button-content-3">me.</div>
                <img className="upload-button-content-4" src={Tux} alt="" onClick={uploadFiles}></img>
                <input ref={fileRef} type="file" accept="image/*" style={{display: 'none'}} multiple={true} onChange={() => {setToggle(!toggle)}}></input>
            </div>
        );
    }

    return (
        <div className="upload-wrapper">
            {toggle ?
                <div className="fade-in-slow">
                    <div className="inverse-dot-wrapper">
                        <div className="inverse-dot">●</div>
                    </div>
                    <Cropper image={PotatoField2}
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
                </div> : 
                <Front></Front>}
        </div>
    );
}

export default Upload;