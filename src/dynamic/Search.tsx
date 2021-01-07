import React, { useEffect, useState } from 'react';

import PullToRefresh from 'react-simple-pull-to-refresh';

import { SearchProps } from '../const/Type';
import { Tag } from '../const/Type';
import TagList from './TagList';
import { EMPTY_STRING, ENTER_KEY, RESET_ICON } from '../const/Constant';

import '../static/css/search.css';
import ViewList from './ViewList';

function Search({ cancel, writing, setContent, setWriting, setPredecessor }: SearchProps) {
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
      setTagList([...tagList, { name: concat(e.target.value.toLowerCase()), count: 99 }]);
    }
  };

  const assign = (tag: string) => {
    setContent(tag);
    setInput(EMPTY_STRING);
    setWriting(false);
    setToggle(true);
    setTagList([]);
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
      setTagList([]);
    }
  }

  useEffect(() => {
    setToggle(false);
  }, [cancel]);

  const [path, setPath] = useState([]);
  const [tagList, setTagList] = useState<Tag[]>([]);

  return (
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
      <TagList tags={tagList} assign={assign}></TagList>
    </div>
  );
}

export default Search;