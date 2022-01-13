import type { GetStaticProps } from 'next';
import ibgeService from './../services/ibgeService';
import Footer from '../components/Footer';
import statsImage from '../../public/stats-graphs.png';
import Image from 'next/image';
import City from '../interfaces/City';
import CitySearchBar from '../components/CitySearchBar';
import { AxiosError } from 'axios';

interface Props {
  cities: City[];
  error: string;
}

const Home = ({ cities, error }: Props) => {
  if (error) {
    return (
      <p>Ocorreu um erro ao carregar a lista de cidades. Tente novamente.</p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow justify-center items-center bg-purple-500 dark:bg-gray-900 space-y-4">
        <div className="w-6/12 md:w-3/12 lg:w-2/12">
          <Image
            src={statsImage}
            alt="stats and graphs"
            placeholder="blur"
            layout="responsive"
          />
        </div>

        <h1 className="text-2xl text-white">Estatísticas Covid-19</h1>

        <CitySearchBar cities={cities} />
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const cities = await ibgeService.getCities();

    return {
      props: {
        cities,
        error: '',
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);

    return {
      props: {
        cities: [],
        error: axiosError.message,
      },
    };
  }
};

export default Home;
