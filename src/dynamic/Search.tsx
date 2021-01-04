import React, { useEffect, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import { SearchProps } from '../const/Types';
import { Tag } from '../const/Types';
import TagList from './TagList';
import { EMPTY_STRING, ENTER_KEY, RESET_ICON } from '../const/Constants';

import '../static/css/search.css';
import ViewList from './ViewList';

function Search({ cancel, writing, setContent, setWriting }: SearchProps) {
  const [input, setInput] = useState(EMPTY_STRING);
  const [toggle, setToggle] = useState(false);

  const concat = (tag: string) => '#' + tag.toLowerCase();

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === EMPTY_STRING) {
      setInput(EMPTY_STRING);
      setWriting(false);
    }
    else {
      setInput(e.target.value);
      setWriting(true);
      setTag([...tag, { name: concat(e.target.value.toLowerCase()), count: 99 }]);
    }
  };

  const assign = (tag: string) => {
    setContent(tag);
    setInput(EMPTY_STRING);
    setWriting(false);
    setToggle(true);
    setTag([]);
  }

  const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY && input !== EMPTY_STRING)
      assign(concat(input));
  }

  const clear = () => {
    if (writing) {
      setContent('🍰');
      setInput(EMPTY_STRING);
      setWriting(false);
      setTag([]);
    }
  }

  useEffect(() => {
    setToggle(false);
  }, [cancel]);

  const [path, setPath] = useState([]);
  const [tag, setTag] = useState<Tag[]>([]);

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
            <input className="search-prepend" value="#" readOnly />
            <input className="search-input" value={input} placeholder="검색"
              onChange={(e) => change(e)} onKeyUp={(e) => submit(e)} />
            <input className="search-append" value={writing ? RESET_ICON : EMPTY_STRING}
              onClick={() => clear()} readOnly />
          </div>
          <div className="dot-wrapper">
            <div className={writing ? "dot fade-in-fast" : "invisible"}>●</div>
          </div>
          <TagList tags={tag} assign={assign}></TagList>
        </div>
      }
    </>
  );
}

export default Search;