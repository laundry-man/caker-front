import React from 'react';

import './static/css/header.css';

function Header() {
    return (
        <div className="caker-header">
        <div className="caker-header-side"></div>
        <div className="caker-header-center">
          <div className="caker-header-wrapper">
            <div className="caker-header-title">
              <span>CAKER</span>
            </div>
            <div className="caker-header-content">
              <span>2000m</span>
            </div>
          </div>
          <div className="caker-header-bar">&nbsp;</div>
        </div>
        <div className="caker-header-side"></div>
      </div>
    );
}

export default Header;