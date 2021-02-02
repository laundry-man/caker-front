import React from 'react';

import TagView from './TagView';

import tagViewList from '../../static/css/geotagsearch/tagViewList.module.css';

type TagViewListProps = {
    pathList: string[],
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

function TagViewList({ 
    pathList, 
    redirect, 
    setContent, 
    setPredecessor }: TagViewListProps) {
        
    return (
        <div className={tagViewList.container}>
            {pathList.map((path, index) => {
                return (<TagView 
                            key={index}
                            path={path}
                            redirect={redirect} 
                            setContent={setContent} 
                            setPredecessor={setPredecessor} 
                        />);
            })}
        </div>
    );
}

export default TagViewList;