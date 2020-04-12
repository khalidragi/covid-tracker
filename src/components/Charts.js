import React from 'react';
import LineChartInf from './LineChartInf';
import LineChartDet from './LineChartDet';

const LineChart = () => {
  return (
    <div className="line-charts">
      <LineChartInf />
      <LineChartDet />
    </div>
  );
};

export default LineChart;
