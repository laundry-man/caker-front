import React, { useEffect, useState } from 'react';
import { SearchProps } from '../const/Types';
import { EMPTY_STRING } from '../const/Constants';
import '../static/css/search.css';

function Search({ cancel, setTag, setCancel }: SearchProps) {
  const [toggle, setToggle] = useState(false);
  const [close, setClose] = useState('');
  const [value, setValue] = useState('');

  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === EMPTY_STRING) {
      setClose(EMPTY_STRING);
      setTag('🍰');
      setValue(EMPTY_STRING);
    }
    else {
      setClose('X');
      setTag('#' + e.target.value.toLowerCase());
      setValue(e.target.value);
    }
  };

  const setInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== EMPTY_STRING) {
      setToggle(true);
      setClose(EMPTY_STRING);
      setValue(EMPTY_STRING);
    }
  }

  const clearInput = (close: string) => {
    if (close === 'X') {
      setClose(EMPTY_STRING);
      setTag('🍰');
      setValue(EMPTY_STRING);
    }
  }

  useEffect(() => {
    setCancel(false);
    setToggle(false);
  }, [cancel]);

  return (
    <>
      {!toggle ?
        <div className="fade-in-fast">
          <div className="search-wrapper">
            <input className="search-prepend" value="#" readOnly></input>
            <input className="search-input" value={value} type="text" placeholder="검색"
              onChange={(e) => getInput(e)} onKeyUp={(e) => { setInput(e) }}></input>
            <input className="search-append" value={close} onClick={() => clearInput(close)} readOnly></input>
          </div>
        </div> : <></>}
    </>
  );
}

export default Search;