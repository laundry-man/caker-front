import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Search from './dynamic/Search';
import Main from './dynamic/Main';
import Upload from './dynamic/Upload';
import List from './dynamic/List';
import Settings from './dynamic/Settings';

import './static/css/app.css';
import './static/css/header.css';
import './static/css/body.css';
import './static/css/footer.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/search"><Search></Search></Route>
        <Route exact path="/"><Main></Main></Route>
        <Route exact path="/upload"><Upload></Upload></Route>
        <Route exact path="/list"><List></List></Route>
        <Route exact path="/settings"><Settings></Settings></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;