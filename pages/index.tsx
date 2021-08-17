import type { GetStaticProps } from 'next';
import { useState } from 'react';
import ibgeService from './../services/ibgeService';
import Autocomplete from 'react-autocomplete';
import router from 'next/router';
import CustomLoader from '../components/CustomLoader';

interface City {
  id: string;
  name: string;
}

interface Props {
  cities: [City];
}

const Home = (props: Props) => {
  const { cities } = props || {};
  const [chosenCity, setChosenCity] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-purple-50 space-y-4">
      <h1 className="text-2xl font-bold text-purple-800">
        Estatísticas Covid-19
      </h1>

      <div className="w-full">
        <Autocomplete
          getItemValue={(city: City) => city.name}
          items={cities.filter((city) =>
            city.name.toLowerCase().includes(chosenCity.toLowerCase())
          )}
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
              'flex border rounded shadow-sm px-4 py-2 w-10/12 lg:w-4/12 focus:shadow-lg',
          }}
        />
      </div>

      {loading && <CustomLoader text="Aguarde..." />}
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
