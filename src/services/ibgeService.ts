import axios, { AxiosError } from 'axios';
import City from '../interfaces/City';
import IbgeCity from '../interfaces/IbgeCity';

const api = axios.create({
  baseURL:
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
});

const getCities = async () => {
  try {
    const res = await api.get<IbgeCity[]>('/');
    const cityData: City[] = res.data.map((municipio: IbgeCity) => {
      const { id, nome } = municipio;
      const estado = municipio.microrregiao.mesorregiao.UF.sigla;

      const name = `${nome}/${estado}`;

      return {
        id,
        name,
      };
    });

    const sortedCityData = cityData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedCityData;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
};

const ibgeService = {
  getCities,
};

export default ibgeService;
