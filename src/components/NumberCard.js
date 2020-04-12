import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import infected from '../assets/biohazard.svg';
import death from '../assets/death.svg';
import newCase from '../assets/ambulance.svg';
import recover from '../assets/coronavirus.svg';
import newdeath from '../assets/skull.svg';
import criticals from '../assets/medical.svg';

const NumberCard = () => {
  const { totalData } = useContext(DataContext);
  let {
    cases,
    recovered,
    deaths,
    critical,
    todayCases,
    todayDeaths,
  } = totalData;

  if (!cases) {
    return <h4>Loading..</h4>;
  }

  return (
    <div className="card-container">
      <div className="vertical">
        <div className="card">
          <div className="card-content">
            <h6>Total Cases</h6>
            <h2>{cases.toLocaleString()}</h2>
          </div>
          <div className="image">
            <img src={infected} alt="" />
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h6>Total Recoveries</h6>
            <h2>{recovered.toLocaleString()}</h2>
          </div>
          <div className="image">
            <img src={recover} width="50px" alt="" />
          </div>
        </div>
      </div>
      <div className="vertical">
        <div className="card">
          <div className="card-content">
            <h6>Total Deaths</h6>
            <h2>{deaths.toLocaleString()}</h2>
          </div>
          <div className="image">
            <img src={death} alt="" />
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h6>Critical Cases</h6>
            <h2>{critical.toLocaleString()}</h2>
          </div>
          <div className="image">
            <img src={criticals} width="50px" alt="" />
          </div>
        </div>
      </div>
      <div className="vertical">
        <div className="card">
          <div className="card-content">
            <h6>Today's Cases</h6>
            <h2>{todayCases.toLocaleString()}</h2>
          </div>
          <div className="image">
            <img src={newCase} alt="" />
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h6>Today's Deaths</h6>
            <h2>{todayDeaths.toLocaleString()}</h2>
          </div>
          <div className="image">
            <img src={newdeath} width="50px" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberCard;
