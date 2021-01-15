import React, { useState } from 'react';

import '../static/css/upload.css';

import Tux from '../static/image/Tux.png';

function Upload() {
    return (
        <div className="caker-container">
            <div className="upload-button fade-in-slow">
                <div className="upload-button-content-1">please</div>
                <div className="upload-button-content-2">touch</div>
                <div className="upload-button-content-3">me.</div>
                <img className="upload-button-content-4" src={Tux} alt=""></img>
            </div>
        </div>
    );
}

export default Upload;