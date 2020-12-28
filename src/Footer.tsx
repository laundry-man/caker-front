import React from 'react';

import './static/css/footer.css';

import Maps from './static/icon/map-marker.svg';
import Notes from './static/icon/plus-black-symbol.svg';
import Settings from './static/icon/cog-wheel-silhouette.svg';
import Books from './static/icon/reorder-option.svg';

function Footer() {
    return (
        <div className="caker-footer">
        <div className="caker-footer-side"></div>
        <div className="caker-footer-center">
          <div className="caker-footer-bar">&nbsp;</div>
          <div className="caker-footer-wrapper">
            <div className="caker-footer-button-wrapper">
              <img alt="" src={Maps} className="icon-color caker-footer-button"></img>
            </div>
            <div className="caker-footer-button-wrapper">
              <img alt="" src={Notes} className="icon-color caker-footer-button"></img>
            </div>
            <div className="caker-footer-button-wrapper">
              <img alt="" src={Books} className="icon-color caker-footer-button"></img>
            </div>
            <div className="caker-footer-button-wrapper">
              <img alt="" src={Settings} className="icon-color caker-footer-button"></img>
            </div>
          </div>
        </div>
        <div className="caker-footer-side"></div>
      </div>
    );
}

export default Footer;