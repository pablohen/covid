import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
});

const getMunicipios = async () => {
  try {
    const res = await api.get('/');
    const dadosMunicipio = res.data.map((municipio: any) => {
      const { id, nome } = municipio;

      return {
        id,
        nome,
      };
    });
    return dadosMunicipio;
  } catch (error) {
    console.log(error.message);
  }
};

const ibgeService = {
  getMunicipios,
};

export default ibgeService;
