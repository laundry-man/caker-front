import React, { useState } from 'react';
import { ViewListProps } from './Types';

import View from './View';

function ViewList({paths} : ViewListProps) {
    return (
        <div className="caker-container">
            {paths.map((path) => <View  path={path}></View>)}
        </div>
    );
}

export default ViewList;