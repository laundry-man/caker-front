import React, { useEffect, useState } from 'react';
import { SearchProps } from './Types';
import '../static/css/search.css';

function Search({ cancel, setTag, setCancel }: SearchProps) {
  const [toggle, setToggle] = useState(false);
  const [close, setClose] = useState('');
  const [value, setValue] = useState('');

  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setClose('');
      setTag('🍰');
      setValue('');
    }
    else {
      setClose('X');
      setTag('#' + e.target.value.toLowerCase());
      setValue(e.target.value);
    }
  };

  const setInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== '') {
      setToggle(true);
      setClose('');
      setValue('');
    }
  }

  const clearInput = (close: string) => {
    if (close == 'X') {
      setClose('');
      setTag('🍰');
      setValue('');
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