import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [totalData, setTotalData] = useState({});
  const [dailyData, setDailyData] = useState([]);
  const [countryData, setCountryData] = useState([]);

  const baseURL = 'https://corona.lmao.ninja/v2/all';
  const url = 'https://covid19.mathdro.id/api';

  const fetchData = async () => {
    const { data } = await axios.get(baseURL);
    setTotalData(data);
  };

  const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);

      setDailyData(
        data.map(({ confirmed, deaths, reportDate: date }) => ({
          confirmed: confirmed.total,
          deaths: deaths.total,
          date,
        }))
      );
    } catch (error) {
      return error;
    }
  };

  const fetchCountryData = async () => {
    try {
      const { data } = await axios.get(
        `https://corona.lmao.ninja/v2/countries`
      );
      setCountryData(
        data.map(
          ({
            country,
            cases,
            deaths,
            recovered,
            todayCases,
            todayDeaths,
            countryInfo: { flag },
            countryInfo: { _id },
          }) => ({
            country,
            cases,
            deaths,
            recovered,
            todayCases,
            todayDeaths,
            flag,
            _id,
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDailyData();
    fetchCountryData();
  }, []);
  return (
    <DataContext.Provider value={{ totalData, dailyData, countryData }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
