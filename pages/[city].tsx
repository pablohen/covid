import { useRouter } from 'next/router';
import brasilioService from '../services/brasilioService';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Bar } from 'react-chartjs-2';
import { NextSeo } from 'next-seo';
import CustomLoader from '../components/CustomLoader';
import Footer from '../components/Footer';
import CityInfoCard from '../components/CityInfoCard';
import Report from '../interfaces/Report';

interface Props {
  reports: Report[];
}

const CityCasesPage = ({ reports }: Props) => {
  const router = useRouter();

  const dataset =
    reports?.map((result) => new Date(result.date).toLocaleDateString()) || [];
  const confirmed = reports?.map((result) => result.confirmed) || [];
  const deaths = reports?.map((result) => result.deaths) || [];

  const data = {
    labels: dataset.reverse(),
    datasets: [
      {
        label: 'casos confirmados',
        data: confirmed.reverse(),
        backgroundColor: ['pink'],
        borderColor: ['pink'],
        borderWidth: 1,
      },
      {
        label: 'óbitos',
        data: deaths.reverse(),
        backgroundColor: ['black'],
        borderColor: ['black'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow justify-center items-center bg-purple-50">
        {router.isFallback ? (
          <CustomLoader text="Carregando..." />
        ) : (
          <div className="flex flex-col p-4 space-x-0 space-y-4 w-full lg:items-center">
            <NextSeo title={`${reports[0].city}/${reports[0].state}`} />

            <CityInfoCard
              city={reports[0].city}
              state={reports[0].state}
              population={reports[0].estimated_population}
              confirmed={reports[0].confirmed}
              deaths={reports[0].deaths}
              deathRate={reports[0].death_rate}
              date={reports[0].date}
            />

            <div className="w-full lg:w-8/12 bg-white rounded border border-purple-400 shadow-md p-4">
              <Bar data={data} options={options} />
            </div>
          </div>
        )}
      </div>
      <Footer />
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

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { city } = context.params || {};

  if (!!city) {
    const reports = await brasilioService.getCityCases(String(city));

    return {
      props: {
        reports,
      },
      revalidate: 60 * 60 * 4,
    };
  }

  return {
    props: {},
    revalidate: 60 * 60 * 4,
  };
};

export default CityCasesPage;
