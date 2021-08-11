import { HttpClient } from './http';
const TQ_API = HttpClient(process.env.TIANQI_BASE_API);
const API = HttpClient(process.env.API_BASE_URL);

const weatherDay = async (location) => {
  const res = await TQ_API.get('/3d', {
    location,
    key: process.env.WEATHER_KEY,
  });
  return res;
};

const news = async () => {
  const res = await API.get('/huabian/index', {
    num: 5,
    key: process.env.API_BASE_KEY,
  });
  return res;
};

const zhuawan = async () => {
  const res = await API.get('/txapi/naowan/index', {
    num: 1,
    key: process.env.API_BASE_KEY,
  });
  return res;
};

export { weatherDay, news, zhuawan };
