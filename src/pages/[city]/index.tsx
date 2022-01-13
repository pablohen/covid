import { useRouter } from 'next/router';
import brasilioService from '../../services/brasilioService';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import CustomLoader from '../../components/CustomLoader';
import Footer from '../../components/Footer';
import CityInfoCard from '../../components/CityInfoCard';
import Report from '../../interfaces/Report';
import CityInfoChart from '../../components/CityInfoChart';
import { AxiosError } from 'axios';
import { ChartData, ChartOptions } from 'chart.js';

interface Props {
  reports: Report[];
  error: string;
}

const CityCasesPage = ({ reports }: Props) => {
  const router = useRouter();

  const dataset =
    reports?.map((result) => new Date(result.date).toLocaleDateString()) || [];
  const confirmed = reports?.map((result) => result.confirmed) || [];
  const deaths = reports?.map((result) => result.deaths) || [];

  const data: ChartData = {
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

  const options: ChartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow justify-center items-center bg-purple-400 dark:bg-gray-800">
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

            <CityInfoChart data={data} options={options} />
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
  const { city } = context.params as { city: string };

  try {
    const reports = await brasilioService.getCityCases(city);

    return {
      props: {
        reports,
        error: false,
      },
      revalidate: 60 * 60 * 4,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return {
      props: {
        reports: [],
        error: axiosError.message,
      },
    };
  }
};

export default CityCasesPage;
