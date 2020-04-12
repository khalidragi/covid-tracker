import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Line } from 'react-chartjs-2';

const LineChartInf = () => {
  const { dailyData } = useContext(DataContext);

  if (!dailyData) {
    return null;
  }

  return (
    <div className="line-chart">
      <Line
        height={180}
        options={{
          maintainAspectRatio: false,
          showLine: false,
          layout: {
            padding: {
              left: 10,
              right: 40,
              top: 1,
              bottom: 10,
            },
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'month',
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  callback: function (label, index, labels) {
                    if (label >= 1000000000) {
                      return (
                        (label / 1000000000).toFixed(1).replace(/\.0$/, '') +
                        'G'
                      );
                    }
                    if (label >= 1000000) {
                      return (
                        (label / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
                      );
                    }
                    if (label >= 1000) {
                      return (
                        (label / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
                      );
                    }
                    return label;
                  },
                },
              },
            ],
          },
        }}
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              radius: 2,
              data: dailyData.map((data) => data.confirmed),
              label: 'Infected',
              borderColor: '#bead49',
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChartInf;
