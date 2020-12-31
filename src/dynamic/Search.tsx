import React, { useEffect } from 'react';
import { SearchProps } from './Types';
import '../static/css/search.css';

function Search({tag, setTag} : SearchProps) {
    const setTagString = (e : React.ChangeEvent<HTMLInputElement>) => {
        return setTag(e.target.value === '' ? '' : '#' + e.target.value.toLowerCase());
    };

    return (
        <div className="fade-in-fast">
          <div className="search-wrapper">
            <input className="search-prepend" value="#" readOnly></input>
            <input className="search-input" type="text" placeholder="검색" onChange={(e) => setTagString(e)}></input>
            <input className="search-append"></input>
          </div>
        </div>
    );
}

export default Search;