import React, { useEffect, useRef, useState } from 'react';

import ImageView from './ImageView';
import { UploadProps } from '../const/Type';

import '../static/css/upload.css';

import Tux from '../static/image/Tux.png';

function Upload({ redirect, setContent, setPredecessor }: UploadProps) {
    const [toggle, setToggle] = useState(false);
    const [pathList, setPathList] = useState<string[]>([]);

    function Entrance() {
        const fileRef = useRef<HTMLInputElement>(null);

        return (
            <div className="upload fade-in-slow">
                <div className="upload-content-1">please</div>
                <div className="upload-content-2">touch</div>
                <div className="upload-content-3">me.</div>
                <img className="upload-content-4" src={Tux} alt="" onClick={() => fileRef.current?.click()}></img>
                <input ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple={true}
                    onChange={(e) => {
                        let _length = e.currentTarget.files?.length;
                        let _pathList: string[] = [];
                        for (let i = 0; _length && i < _length; i++)
                            _pathList.push((window.URL || window.webkitURL).createObjectURL(e.currentTarget.files?.item(i)));
                        setToggle(!toggle);
                        setPathList(_pathList);
                    }} />
            </div>
        );
    }

    return (
        <div className="upload-wrapper">
            {toggle ? 
                <ImageView pathList={pathList} 
                           redirect={redirect} 
                           setContent={setContent} 
                           setPredecessor={setPredecessor}></ImageView> :
                <Entrance></Entrance>
            }
        </div>
    );
}

export default Upload;