import { BarControllerChartOptions, ChartData } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Props {
  data: ChartData<'bar'>;
  options: any;
}

const CityInfoChart = ({ data, options }: Props) => {
  return (
    <div className="w-full lg:w-8/12 bg-white rounded-2xl border border-purple-400 dark:border-gray-600 shadow-md p-8">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CityInfoChart;
