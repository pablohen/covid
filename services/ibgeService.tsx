import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
});

const getCities = async () => {
  try {
    const res = await api.get('/');
    const cityData = res.data.map((municipio: any) => {
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
    console.error(error.message);
  }
};

const ibgeService = {
  getCities,
};

export default ibgeService;
