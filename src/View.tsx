import React, { useState } from 'react';

type ViewProps = {
    path: string
};

function View({path} : ViewProps) {
    return (
        <div style={{ width: '100%', marginBottom: '1vh' }}>
            <img alt="" src={path} style={{ height: '100%', width: '100%', borderRadius: '5px' }}></img>
        </div>
    );
}

export default View;