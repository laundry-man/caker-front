import React, { useState } from 'react';
import View from './View';

type ViewListProps = {
    paths: string[];
};

function ViewList({paths} : ViewListProps) {
    const viewList = paths.map((path) => <View path={path}></View>);

    return (
        <div className="caker-container">
            {viewList}
        </div>
    );
}

export default ViewList;