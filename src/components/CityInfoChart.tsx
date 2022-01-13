import { ChartData, ChartOptions } from 'chart.js';
import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

interface Props {
  data: ChartData;
  options: ChartOptions;
}

const CityInfoChart = ({ data, options }: Props) => {
  return (
    <div className="w-full lg:w-8/12 bg-white rounded-2xl border border-purple-400 dark:border-gray-600 shadow-md p-8">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default CityInfoChart;
