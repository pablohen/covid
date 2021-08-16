import React from 'react';
import { useRouter } from 'next/router';
import brasilioService from '../services/brasilioService';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { NextSeo } from 'next-seo';

interface Props {
  city: string;
  results: [any];
}

const CityCasesPage = (props: Props) => {
  const { city, results } = props || {};
  const router = useRouter();

  const dataset = results?.map((result) => result.date) || [];
  const confirmed = results?.map((result) => result.confirmed) || [];
  const deaths = results?.map((result) => result.deaths) || [];

  const data = {
    labels: dataset.reverse(),
    datasets: [
      {
        label: `${results?.[0].confirmed} Casos confirmados`,
        data: confirmed.reverse(),
        backgroundColor: ['pink'],
        borderColor: ['pink'],
        borderWidth: 1,
      },
      {
        label: `${results?.[0].deaths} Óbitos`,
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
    <div className="bg-gray-50 min-h-screen">
      {router.isFallback ? (
        <p>Carregando...</p>
      ) : (
        <div className="flex flex-col p-4 space-x-0 space-y-4">
          <NextSeo title={`${results[0].city}/${results[0].state}`} />
          <div className="flex flex-col justify-center items-center text-center md:flex-row md:justify-between md:text-left w-full lg:w-1/2 h-full border rounded bg-white p-4 shadow-md relative">
            <div className="pb-4 space-y-1">
              <p className="font-bold text-2xl">
                {`${results[0].city}/${results[0].state}`}
              </p>
              <p className="text-xs text-gray-500 font-bold">
                {results[0].estimated_population} habitantes (estimativa)
              </p>
            </div>

            <div className="">
              <p>
                <CountUp
                  end={results[0].confirmed}
                  duration={1}
                  className="font-bold"
                />{' '}
                casos confirmados
              </p>
              <p>
                <CountUp
                  end={results[0].deaths}
                  duration={1}
                  className="font-bold"
                />{' '}
                óbitos
              </p>
            </div>

            <p className="absolute text-white text-xs font-bold bg-gray-500 p-1 rounded-tr rounded-bl top-0 right-0">
              {`Dados até: ${new Date(results[0].date).toLocaleDateString()}`}
            </p>
          </div>

          <div className="w-full">
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
          city: 'Limeira',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { city } = context.params;

  if (!!city) {
    const res = await brasilioService.getCityCases(String(city));

    return {
      props: {
        city,
        results: res.data.results,
      },
      revalidate: 60 * 60 * 4,
    };
  }
};

export default CityCasesPage;
