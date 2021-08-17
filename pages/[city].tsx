import React from 'react';
import { useRouter } from 'next/router';
import brasilioService from '../services/brasilioService';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { NextSeo } from 'next-seo';
import CustomLoader from '../components/CustomLoader';

interface Report {
  city: string;
  city_ibge_code: number;
  confirmed: number;
  confirmed_per_100k_inhabitants: number;
  date: Date;
  death_rate: number;
  deaths: number;
  estimated_population: number;
  estimated_population_2019: number;
  is_last: Boolean;
  order_for_place: number;
  place_type: string;
  state: string;
}

interface Props {
  reports: [Report];
}

const CityCasesPage = (props: Props) => {
  const { reports } = props || {};
  const router = useRouter();

  const dataset = reports?.map((result) => result.date) || [];
  const confirmed = reports?.map((result) => result.confirmed) || [];
  const deaths = reports?.map((result) => result.deaths) || [];

  const data = {
    labels: dataset.reverse(),
    datasets: [
      {
        label: `${reports?.[0].confirmed} casos confirmados`,
        data: confirmed.reverse(),
        backgroundColor: ['pink'],
        borderColor: ['pink'],
        borderWidth: 1,
      },
      {
        label: `${reports?.[0].deaths} óbitos`,
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
    <div className="flex flex-col justify-center items-center bg-purple-50 min-h-screen">
      {router.isFallback ? (
        <CustomLoader text="Carregando..." />
      ) : (
        <div className="flex flex-col p-4 space-x-0 space-y-4 w-full lg:items-center">
          <NextSeo title={`${reports[0].city}/${reports[0].state}`} />
          <div className="flex flex-col justify-center items-center text-center md:flex-row md:justify-between md:text-left w-full lg:w-1/2 h-full border border-purple-400 rounded bg-white p-4 pt-8 md:pt-8 shadow-md relative">
            <div className="pb-4 space-y-1">
              <p className="font-bold text-2xl text-purple-500">
                {`${reports[0].city}/${reports[0].state}`}
              </p>
              <p className="font-bold text-xs text-purple-500">
                {reports[0].estimated_population} habitantes (estimativa)
              </p>
            </div>

            <div>
              <p className="text-sm text-purple-500">
                <CountUp
                  end={reports[0].confirmed}
                  duration={1}
                  className="font-bold"
                />{' '}
                casos confirmados
              </p>
              <p className="text-sm text-purple-500">
                <CountUp
                  end={reports[0].deaths}
                  duration={1}
                  className="font-bold"
                />{' '}
                óbitos
              </p>
              <p className="text-sm text-purple-500">
                <span className="font-bold">
                  {Number(reports[0].death_rate * 100).toPrecision(2)}%
                </span>{' '}
                de letalidade
              </p>
            </div>

            <p className="absolute text-white text-xs font-bold bg-purple-400 p-1 rounded-tr rounded-bl top-0 right-0">
              {`Atualizado em: ${new Date(
                reports[0].date
              ).toLocaleDateString()}`}
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
          city: '3526902',
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
    const reports = res.data.results;

    return {
      props: {
        reports,
      },
      revalidate: 60 * 60 * 4,
    };
  }
};

export default CityCasesPage;
