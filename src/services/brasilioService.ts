import axios, { AxiosError } from 'axios';
import Report from '../interfaces/Report';

const api = axios.create({
  baseURL: 'https://api.brasil.io/v1/dataset/covid19/caso/data/',
  headers: {
    Authorization: `Token ${process.env.BRASILIO_TOKEN}`,
  },
});

const getCityCases = async (city: string) => {
  try {
    const res = await api.get<{ results: Report[] }>('/', {
      params: { city_ibge_code: city },
    });

    return res.data.results;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
};

const brasilioService = {
  getCityCases,
};

export default brasilioService;
