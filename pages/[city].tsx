import React from 'react';
import { useRouter } from 'next/router';
import brasilioService from '../services/brasilioService';
import { GetStaticPaths, GetStaticProps } from 'next';
// import Chart from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';

interface Props {
  city: string;
  results: [];
}

const CityCasesPage = (props: Props) => {
  const { city, results } = props || {};
  const router = useRouter();

  console.log(results);
  const dataset = results?.map((result) => result.date) || [];
  const confirmed = results?.map((result) => result.confirmed) || [];
  const deaths = results?.map((result) => result.deaths) || [];

  const data = {
    labels: dataset.reverse(),
    datasets: [
      {
        label: `${results[0].confirmed} Casos confirmados`,
        data: confirmed.reverse(),
        backgroundColor: ['pink'],
        borderColor: ['pink'],
        borderWidth: 1,
      },
      {
        label: `${results[0].deaths} Casos confirmados`,
        data: deaths.reverse(),
        backgroundColor: ['black'],
        borderColor: ['black'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      {router.isFallback ? (
        <p>Carregando...</p>
      ) : (
        <div className="flex flex-col lg:flex-row p-4 space-x-0 space-y-4 lg:space-x-4 lg:space-y-0">
          <div className="flex justify-between items-center w-full h-full border rounded p-4 shadow-md relative">
            <div className="pb-4 space-y-1">
              <p className="font-bold text-2xl">
                {results[0].city}/{results[0].state}
              </p>
              <p className="text-xs text-gray-500">
                {results[0].estimated_population} habitantes (estimativa)
              </p>
            </div>

            <div className="">
              <p>
                <CountUp end={results[0].confirmed} duration={1} /> casos
                confirmados
              </p>
              <p>
                <CountUp end={results[0].deaths} duration={1} /> óbitos
              </p>
            </div>

            <p className="absolute text-white text-xs font-bold bg-gray-500 p-1 rounded-tr rounded-bl top-0 right-0">
              {new Date(results[0].date).toLocaleDateString()}
            </p>
          </div>

          <div className="">
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          city: '',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { city } = context.params;
  const res = await brasilioService.getCityCases(city);

  return {
    props: {
      city,
      results: res.data.results,
    },
  };
};

export default CityCasesPage;
