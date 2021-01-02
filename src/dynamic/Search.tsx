import React, { useEffect, useState } from 'react';

import { SearchProps } from '../const/Types';
import { EMPTY_STRING, ENTER_KEY, RESET_ICON } from '../const/Constants';

import '../static/css/search.css';

function Search({ cancel, setContent, setWriting }: SearchProps) {
  const [reset, setReset] = useState(EMPTY_STRING);
  const [input, setInput] = useState(EMPTY_STRING);
  const [toggle, setToggle] = useState(false);

  const assign = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === EMPTY_STRING) {
      setReset(EMPTY_STRING);
      setContent('🍰');
      setInput(EMPTY_STRING);
      setWriting(false);
    }
    else {
      setReset(RESET_ICON);
      setContent('#' + e.target.value.toLowerCase());
      setInput(e.target.value);
      setWriting(true);
    }
  };

  const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY && input !== EMPTY_STRING) {
      setToggle(true);
      setReset(EMPTY_STRING);
      setInput(EMPTY_STRING);
      setWriting(false);
    }
  }

  const clear = () => {
    if (reset === RESET_ICON) {
      setReset(EMPTY_STRING);
      setContent('🍰');
      setInput(EMPTY_STRING);
      setWriting(false);
    }
  }

  useEffect(() => {
    setToggle(false);
  }, [cancel]);

  return (
    <>
      {toggle ? <></> :
        <div className="fade-in-fast">
          <div className="search-wrapper">
            <input className="search-prepend" value="#" readOnly></input>
            <input className="search-input" value={input} placeholder="검색" onChange={(e) => assign(e)} onKeyUp={(e) => submit(e)}></input>
            <input className="search-append" value={reset} onClick={() => clear()} readOnly></input>
          </div>
        </div>}
    </>
  );
}

export default Search;