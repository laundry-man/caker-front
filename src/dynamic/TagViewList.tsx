import React from 'react';
import { TagViewListProps } from '../const/Type';

import TagView from './TagView';

function TagViewList({ redirect, setContent, setPredecessor }: TagViewListProps) {
    return (
        <div className="caker-container">
            <TagView redirect={redirect} 
                     setContent={setContent} 
                     setPredecessor={setPredecessor}></TagView>
        </div>
    );
}

export default TagViewList;