import React from 'react';
import logo from '../assets/logo_v1.png';

const Logo = () => {
  return (
    <>
      <div className="logo">
        <div className="logo-main">
          <img src={logo} alt="covid-19 logo" />
          <h1>COVID-19</h1>
          <p>TRACKER</p>
        </div>
        <div className="logo-para">
          <p>Track the spread of the Coronavirus Covid-19 outbreak</p>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://khalidragi.com">
            <p>Made by Khalid Ragi</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Logo;
