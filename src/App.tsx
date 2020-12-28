import React from 'react';

import './static/css/app.css';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function App() {
  return (
    <div className="app fade-in-app">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default App;