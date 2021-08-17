import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.brasil.io/v1/dataset/covid19/caso/data/',
  headers: {
    Authorization: `Token ${process.env.BRASILIO_TOKEN}`,
  },
});

const getCityCases = async (city: string) => {
  try {
    const res = await api.get('/', { params: { city_ibge_code: city } });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

const brasilioService = {
  getCityCases,
};

export default brasilioService;
