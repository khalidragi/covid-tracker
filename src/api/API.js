import axios from 'axios';
const baseURL = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
  const data = await axios.get(baseURL);
  const res = await data.data;
  const totalNum = [
    { value: res.confirmed.value, label: 'Total Cases' },
    { value: res.recovered.value, label: 'Total Recoveries' },
    { value: res.deaths.value, label: 'Total Deaths' },
  ];
  return totalNum;
};
