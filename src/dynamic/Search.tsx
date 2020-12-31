import React, { useEffect, useState } from 'react';
import { SearchProps } from './Types';
import '../static/css/search.css';

function Search({ tag, setTag }: SearchProps) {
  const [close, setClose] = useState('');
  const [string, setString] = useState('');

  const setTagString = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setClose('');
      setTag('🍰');
      setString('');
    }
    else {
      setClose('X');
      setTag('#' + e.target.value.toLowerCase());
      setString(e.target.value);
    }
  };

  const clearTagString = (close: string) => {
    if (close == 'X') {
      setClose('');
      setTag('🍰');
      setString('');
    }
  }

  return (
    <div className="fade-in-fast">
      <div className="search-wrapper">
        <input className="search-prepend" value="#" readOnly></input>
        <input className="search-input" value={string} type="text" placeholder="검색" onChange={(e) => setTagString(e)}></input>
        <input className="search-append" value={close} readOnly onClick={() => clearTagString(close)}></input>
      </div>
    </div>
  );
}

export default Search;