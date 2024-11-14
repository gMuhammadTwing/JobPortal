import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = () => {
  const series = [
    {
      name: 'STOCK ABC',
      data: [81, 75, 88, 90, 72, 80, 89, 91, 73, 85, 88, 92], // Replace with actual data
    },
  ];

  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Fundamental Analysis of Stocks',
      align: 'left',
    },
    subtitle: {
      text: 'Price Movements',
      align: 'left',
    },
    labels: [
      '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01',
      '2023-06-01', '2023-07-01', '2023-08-01', '2023-09-01', '2023-10-01',
      '2023-11-01', '2023-12-01',
    ], // Replace with actual dates
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: 'left',
    },
  };

  return (
    <div id="chart" className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ChartOne;
