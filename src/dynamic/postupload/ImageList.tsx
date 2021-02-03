import React from 'react'

import Matin3 from '../../static/image/matin_3.png';

import imageList from '../../static/css/postupload/imageList.module.css';

function ImageList() {
    return (
        <img src={Matin3} className={imageList.image} />
    );
}

export default ImageList;