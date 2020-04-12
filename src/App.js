import React from 'react';
import './App.scss';
import NumberCard from './components/NumberCard';
import Charts from './components/Charts';
import Countries from './components/Countries';
import Logo from './components/Logo';

function App() {
  return (
    <div className="App">
      <div className="numbers-container">
        <NumberCard />
      </div>
      <div className="charts-container">
        <Charts />
      </div>
      <div className="countries-container">
        <Countries />
      </div>
      <div className="logo-container">
        <Logo />
      </div>
    </div>
  );
}

export default App;
