import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.brasil.io/v1/dataset/covid19/caso/data/',
  headers: {
    Authorization: `Token ${process.env.BRASILIO_TOKEN}`,
  },
});

const getCityCases = async (city: string) => {
  try {
    const res = await api.get('/', { params: { city } });

    console.log(res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

const brasilioService = {
  getCityCases,
};

export default brasilioService;
