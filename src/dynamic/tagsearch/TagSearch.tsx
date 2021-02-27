import React, { useState } from 'react';

import TagList from './TagList';

import { EMPTY_STRING, 
         ENTER_KEY, 
         RESET_ICON, 
         Page, 
         TAG_SEARCH, 
         TAG_SEARCH_RESULT } from '../../const/Constant';

import index from '../../static/css/index.module.css';
import tagSearch from '../../static/css/tagsearch/tagSearch.module.css';

type Tag = {
  name: string,
  count: number
};

type TagSearchProps = {
  redirect: (page: Page) => void,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setPredecessor: React.Dispatch<React.SetStateAction<Page>>
};

function TagSearch({
  redirect,
  setContent,
  setPredecessor }: TagSearchProps) {

  const [input, setInput] = useState(EMPTY_STRING);
  const [isWritten, setIsWritten] = useState(false);
  const [tagList, setTagList] = useState<Tag[]>([]);

  function attachHashtag(tag: string) {
    return '#' + tag.toLowerCase();
  }

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === EMPTY_STRING) {
      setInput(EMPTY_STRING);
      setIsWritten(false);
    }
    else {
      if (!isWritten)
        setIsWritten(true);
      setInput(e.target.value);
      setTagList([...tagList, { name: attachHashtag(e.target.value.toLowerCase()), count: 99 }]);
    }
  }

  function assignKeyword(tag: string) {
    setContent(tag);
    setPredecessor(TAG_SEARCH);
    redirect(TAG_SEARCH_RESULT);
  }

  function submitKeyword(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === ENTER_KEY && input !== EMPTY_STRING)
      assignKeyword(attachHashtag(input));
  }

  function clearKeyword() {
    if (isWritten) {
      setContent(EMPTY_STRING);
      setInput(EMPTY_STRING);
      setTagList([]);
      setIsWritten(false);
    }
  }

  return (
    <div className={index.fadeInFast}>
      <div className={tagSearch.wrapper}>
        <input className={tagSearch.prepend} value="#" readOnly />
        <input className={tagSearch.input} value={input} placeholder="태그"
          onChange={(e) => changeInput(e)} onKeyUp={(e) => submitKeyword(e)} />
        <input className={tagSearch.append} value={isWritten ? RESET_ICON : EMPTY_STRING}
          onClick={() => clearKeyword()} readOnly />
      </div>
      <TagList
        tagListProp={tagList}
        isWritten={isWritten}
        assignKeyword={assignKeyword}
      />
    </div>
  );
}

export default TagSearch;