import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { EMPTY_STRING } from './const/Constant';

function App() {
  const [content, setContent] = useState(EMPTY_STRING);
  const [predecessor, setPredecessor] = useState(EMPTY_STRING);

  const [isTagSearch, setIsTagSearch] = useState(false);
  const [isPostUpload, setIsPostUpload] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  function redirect(path: string) {
    history.push(path);
  }

  function clearContent() {
    if (predecessor !== EMPTY_STRING) {
      setContent(EMPTY_STRING);
      redirect(predecessor);
      setPredecessor(EMPTY_STRING);
    }
  }

  function changeBackground(isPostUpload: boolean) {
    document.body.style.background =
      isPostUpload ? '#333333' : '#F2F1ED';
  }

  function pageDidMount(isTagSearch: boolean, isPostUpload: boolean = false) {
    if (content !== EMPTY_STRING)
      setContent(EMPTY_STRING);
    changeBackground(isPostUpload);
    setIsTagSearch(isTagSearch);
    setIsPostUpload(isPostUpload);
  }


  return (
    <>
      {isPostUpload ? "" : ""}
    </>
  );
};

export default App;