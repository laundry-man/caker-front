import React from 'react';
import { TagViewListProps } from '../../const/Type';

import TagView from './TagView';

import tagViewList from '../../static/css/geo_tag_search/tagViewList.module.css';

function TagViewList({ pathList, redirect, setContent, setPredecessor }: TagViewListProps) {
    return (
        <div className={tagViewList.container}>
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