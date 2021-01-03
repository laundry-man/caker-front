import React from 'react';
import { ViewListProps } from '../const/Types';

import View from './View';

function ViewList({ paths }: ViewListProps) {
    return (
        <div className="caker-container">
            {paths.map((path, index) => <View key={index} path={path}></View>)}
        </div>
    );
}

export default ViewList;