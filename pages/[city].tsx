import React from 'react';
import { useRouter } from 'next/router';
import brasilioService from '../services/brasilioService';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { NextSeo } from 'next-seo';

interface Report {
  date: Date;
  confirmed: number;
  deaths: number;
  city: string;
  state: string;
  estimated_population: number;
}

interface Props {
  results: [Report];
}

const CityCasesPage = (props: Props) => {
  const { results } = props || {};
  const router = useRouter();

  const dataset = results?.map((result) => result.date) || [];
  const confirmed = results?.map((result) => result.confirmed) || [];
  const deaths = results?.map((result) => result.deaths) || [];

  const data = {
    labels: dataset.reverse(),
    datasets: [
      {
        label: `${results?.[0].confirmed} casos confirmados`,
        data: confirmed.reverse(),
        backgroundColor: ['pink'],
        borderColor: ['pink'],
        borderWidth: 1,
      },
      {
        label: `${results?.[0].deaths} óbitos`,
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
    <div className="bg-purple-50 min-h-screen">
      {router.isFallback ? (
        <p>Carregando...</p>
      ) : (
        <div className="flex flex-col p-4 space-x-0 space-y-4 w-full lg:items-center">
          <NextSeo title={`${results[0].city}/${results[0].state}`} />
          <div className="flex flex-col justify-center items-center text-center md:flex-row md:justify-between md:text-left w-full lg:w-1/2 h-full border border-purple-400 rounded bg-white p-4 pt-8 md:pt-4 shadow-md relative">
            <div className="pb-4 space-y-1">
              <p className="font-bold text-2xl text-purple-500">
                {`${results[0].city}/${results[0].state}`}
              </p>
              <p className="font-bold text-xs text-purple-500">
                {results[0].estimated_population} habitantes (estimativa)
              </p>
              <a
                className="font-bold text-xs text-purple-500 underline"
                href={`http://www.${results[0].city.toLowerCase()}.${results[0].state.toLowerCase()}.gov.br`}
                target="_blank"
                rel="noreferrer"
              >
                {`www.${results[0].city.toLowerCase()}.${results[0].state.toLowerCase()}.gov.br`}
              </a>
            </div>

            <div>
              <p className="text-sm text-purple-500">
                <CountUp
                  end={results[0].confirmed}
                  duration={1}
                  className="font-bold"
                />{' '}
                casos confirmados
              </p>
              <p className="text-sm text-purple-500">
                <CountUp
                  end={results[0].deaths}
                  duration={1}
                  className="font-bold"
                />{' '}
                óbitos
              </p>
            </div>

            <p className="absolute text-white text-xs font-bold bg-purple-400 p-1 rounded-tr rounded-bl top-0 right-0">
              {`Dados até: ${new Date(results[0].date).toLocaleDateString()}`}
            </p>
          </div>

          <div className="w-full lg:w-10/12 bg-white rounded border border-purple-400 shadow-md p-4">
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
        results: res.data.results,
      },
      revalidate: 60 * 60 * 4,
    };
  }
};

export default CityCasesPage;
