import React from 'react';
import { ViewListProps } from '../../const/Type';

import View from './View';

function ViewList({ pathList }: ViewListProps) {
    return (
        <div className="caker-container">
            {pathList.map((path, index) => <View key={index} path={path}></View>)}
        </div>
    );
}

export default ViewList;