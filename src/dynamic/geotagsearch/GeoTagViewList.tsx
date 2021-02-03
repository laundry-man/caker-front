import React from 'react';

import GeoTagView from './GeoTagView';

import geoTagViewList from '../../static/css/geotagsearch/geoTagSearchViewList.module.css';

type GeoTagViewListProps = {
    pathList: string[],
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

function GeoTagViewList({ 
    pathList, 
    redirect, 
    setContent, 
    setPredecessor }: GeoTagViewListProps) {
        
    return (
        <div className={geoTagViewList.container}>
            {pathList.map((path, index) => {
                return (<GeoTagView 
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

export default GeoTagViewList;