import React from 'react';

import GeoTagView from './GeoTagView';

import geoTagViewList from '../../static/css/geotagsearch/geoTagViewList.module.css';

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
            {pathList.map((path, key) => {
                return (<GeoTagView 
                            key={key}
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