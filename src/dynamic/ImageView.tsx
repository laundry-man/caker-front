import React, { useEffect, useState } from 'react';

import Cropper from 'react-easy-crop';

import { ImageViewProps } from '../const/Type';

function ImageView({ pathList, redirect, setContent, setPredecessor }: ImageViewProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const length: number = pathList.length;
    const checkList: boolean[] = (() => {
        let _checkList: boolean[] = [];
        for (let i = 0; i < length; i++)
            _checkList.push(false);
        return _checkList;
    })();

    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState((() => {
        let _active: boolean[] = [];
        for (let i = 0; i < length; i++)
            _active.push(!i ? true : false);
        return _active;
    })());

    const getNextView = () => {
        if (loaded) {
            let _active: boolean[] = [...active];
            let _f: boolean | undefined = _active.pop();
            _active.unshift(_f === undefined ? false : _f);
            setActive(_active);
        }
        else {
            let count = 0;
            for (let i = 0; i < length; i++)
                if (checkList[i])
                    count++;
            if (count == length) {
                console.log(count);
                setLoaded(true);
                let _active: boolean[] = [...active];
                let _f: boolean | undefined = _active.pop();
                _active.unshift(_f === undefined ? false : _f);
                setActive(_active);
            }
        }
    };

    useEffect(() => {
        setPredecessor('/upload');
        console.log(pathList);
    }, []);

    useEffect(() => {
        active.map((active, index) => { 
            if (active) 
                setContent(`${index + 1}/${length}`) 
        });
    }, [active]);

    return (
        <>
            {pathList.map((path, index) => {
                <div className="cropper fade-in-slow" onClick={getNextView}>
                    <div className="inverse-dot-wrapper">
                        <div className="inverse-dot">●</div>
                    </div>
                    <Cropper image={path}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onMediaLoaded={() => { checkList[index] = true; }}
                        style={{
                            cropAreaStyle: { border: 'none' }
                        }}>
                    </Cropper>
                </div>
            })};
        </>
    );
}

export default ImageView;