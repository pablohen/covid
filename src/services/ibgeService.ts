import axios from 'axios';
import City from '../interfaces/City';
import IbgeCity from '../interfaces/IbgeCity';

const api = axios.create({
  baseURL:
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
});

const getCities = async () => {
  try {
    const res = await api.get('/');
    const cityData: City[] = res.data.map((municipio: IbgeCity) => {
      const { id, nome } = municipio;
      const estado = municipio.microrregiao.mesorregiao.UF.sigla;

      const name = `${nome}/${estado}`;

      return {
        id,
        name,
      };
    });
    return cityData.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    throw new Error(error.message);
  }
};

const ibgeService = {
  getCities,
};

export default ibgeService;
