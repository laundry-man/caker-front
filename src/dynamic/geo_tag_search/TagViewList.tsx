import React from 'react';
import { TagViewListProps } from '../../const/Type';

import TagView from './TagView';

function TagViewList({ pathList, redirect, setContent, setPredecessor }: TagViewListProps) {
    return (
        <div className="caker-container">
            {pathList.map((path, index) => {
                return (<TagView key={index}
                                 path={path}
                                 redirect={redirect} 
                                 setContent={setContent} 
                                 setPredecessor={setPredecessor}></TagView>);
            })}
        </div>
    );
}

export default TagViewList;