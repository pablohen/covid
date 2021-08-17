import type { GetStaticProps } from 'next';
import { useState } from 'react';
import ibgeService from './../services/ibgeService';
import Autocomplete from 'react-autocomplete';
import router from 'next/router';
import CustomLoader from '../components/CustomLoader';

interface Municipio {
  id: string;
  name: string;
}

interface Props {
  municipios: [Municipio];
}

const Home = (props: Props) => {
  const { municipios } = props || {};
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');
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
          getItemValue={(municipio: Municipio) => municipio.name}
          items={municipios.filter((municipio) =>
            municipio.name
              .toLowerCase()
              .includes(municipioSelecionado.toLowerCase())
          )}
          renderItem={(municipio: Municipio, isHighlighted: Boolean) => (
            <div
              key={municipio.id}
              className={`px-2 ${
                isHighlighted ? 'bg-purple-200' : 'bg-transparent'
              }`}
            >
              {municipio.name}
            </div>
          )}
          value={municipioSelecionado}
          onChange={(e: any) => setMunicipioSelecionado(e.target.value)}
          onSelect={(val: string, item: Municipio) => {
            setMunicipioSelecionado(val);
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
  const municipios = await ibgeService.getMunicipios();

  return {
    props: {
      municipios,
      revalidate: 60 * 60 * 24,
    },
  };
};

export default Home;
