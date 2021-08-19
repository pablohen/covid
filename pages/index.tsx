import type { GetStaticProps } from 'next';
import { useState } from 'react';
import ibgeService from './../services/ibgeService';
import Autocomplete from 'react-autocomplete';
import router from 'next/router';
import CustomLoader from '../components/CustomLoader';
import Footer from '../components/Footer';
import slugify from 'slugify';
import statsImage from '../public/stats-graphs.png';
import Image from 'next/image';
import City from '../interfaces/City';

interface Props {
  cities: City[];
}

const Home = (props: Props) => {
  const { cities } = props || {};
  const [chosenCity, setChosenCity] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const filterList = () => {
    return cities.filter((city) =>
      slugify(city.name, { lower: true }).includes(
        slugify(chosenCity, { lower: true })
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow justify-center items-center  bg-purple-50 space-y-4">
        <div className="w-6/12 md:w-3/12 lg:w-2/12">
          <Image
            src={statsImage}
            alt="stats and graphs"
            placeholder="blur"
            layout="responsive"
          />
        </div>

        <h1 className="text-2xl font-bold text-purple-800">
          Estatísticas Covid-19
        </h1>

        <div className="w-full">
          <Autocomplete
            getItemValue={(city: City) => city.name}
            items={filterList()}
            renderItem={(city: City, isHighlighted: Boolean) => (
              <div
                key={city.id}
                className={`px-2 ${
                  isHighlighted ? 'bg-purple-200' : 'bg-transparent'
                }`}
              >
                {city.name}
              </div>
            )}
            value={chosenCity}
            onChange={(e: any) => setChosenCity(e.target.value)}
            onSelect={(val: string, item: City) => {
              setChosenCity(val);
              router.push(`/${item.id}`);
              toggleLoading();
            }}
            wrapperProps={{
              style: { display: 'flex' },
              className: 'flex justify-center',
            }}
            inputProps={{
              placeholder: 'Escolha uma cidade do Brasil...',
              className:
                'flex border rounded shadow-sm px-4 py-2 w-10/12 lg:w-4/12 focus:shadow-lg focus:outline-none focus:ring-0 focus:border-purple-500',
            }}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2px 0',
              position: 'fixed',
              overflow: 'auto',
              maxHeight: '10em',
            }}
          />
        </div>

        {loading && <CustomLoader text="Aguarde..." />}
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cities = await ibgeService.getCities();

  return {
    props: {
      cities,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
