import type { GetStaticProps } from 'next';
import { useState } from 'react';
import ibgeService from './../services/ibgeService';
import Autocomplete from 'react-autocomplete';
import router from 'next/router';

interface Municipio {
  id: number;
  nome: string;
}

interface Props {
  municipios: [Municipio];
}

const Home = (props: Props) => {
  const { municipios } = props || {};
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Estatísticas Covid-19
      </h1>

      <div className="">
        <Autocomplete
          getItemValue={(municipio: Municipio) => municipio.nome}
          items={municipios.filter((municipio) =>
            municipio.nome
              .toLowerCase()
              .includes(municipioSelecionado.toLowerCase())
          )}
          renderItem={(municipio: Municipio, isHighlighted: Boolean) => (
            <div
              key={municipio.id}
              className={`${isHighlighted ? 'bg-gray-200' : 'bg-transparent'}`}
            >
              {municipio.nome}
            </div>
          )}
          value={municipioSelecionado}
          onChange={(e: any) => setMunicipioSelecionado(e.target.value)}
          onSelect={(val: string) => {
            setMunicipioSelecionado(val);
            router.push(val);
          }}
          inputProps={{
            placeholder: 'Escolha uma cidade...',
            className:
              'border rounded shadow-sm px-4 py-2 max-w-96 focus:shadow-lg',
          }}
        />
      </div>
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
