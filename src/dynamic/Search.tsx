import React, { useEffect, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import { SearchProps } from '../const/Types';
import { Tag } from '../const/Types';
import TagList from './TagList';
import { EMPTY_STRING, ENTER_KEY, RESET_ICON } from '../const/Constants';

import '../static/css/search.css';
import ViewList from './ViewList';

function Search({ cancel, writing, setContent, setWriting }: SearchProps) {
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
      if (reset !== RESET_ICON)
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

  const [path, setPath] = useState([]);
  const [tag, setTag] = useState<Tag[]>([
    {name: '#brownhands', path: ''},
    {name: '#matin', path: ''},
    {name: '#whalemarket', path: ''},
    {name: '#anthracite', path: ''},
    {name: '#brownhands', path: ''},
    {name: '#matin', path: ''},
    {name: '#whalemarket', path: ''},
    {name: '#anthracite', path: ''},
    {name: '#brownhands', path: ''},
    {name: '#matin', path: ''},
    {name: '#whalemarket', path: ''},
    {name: '#anthracite', path: ''},
    {name: '#brownhands', path: ''},
    {name: '#matin', path: ''},
    {name: '#whalemarket', path: ''},
    {name: '#anthracite', path: ''}
  ]);

  const getNewData = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const resetData = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  return (
    <>
      {toggle ?
        <PullToRefresh
          onRefresh={resetData}
          canFetchMore={true}
          isPullable={true}
          onFetchMore={getNewData}
          fetchMoreThreshold={0}
          pullDownThreshold={67}
          maxPullDownDistance={95}
          className={"pull-to-refresh fade-in-fast"}>
          <ViewList paths={path}></ViewList>
        </PullToRefresh> :
        <div className="fade-in-fast">
          <div className="search-wrapper">
            <input className="search-prepend" value="#" readOnly></input>
            <input className="search-input" value={input} placeholder="검색" onChange={(e) => assign(e)} onKeyUp={(e) => submit(e)}></input>
            <input className="search-append" value={reset} onClick={() => clear()} readOnly></input>
          </div>
          <div className="dot-wrapper">
            <div className={writing ? "dot fade-in-fast" : "invisible"}>●</div>
          </div>
          <TagList tags={tag}></TagList>
        </div>}
    </>
  );
}

export default Search;