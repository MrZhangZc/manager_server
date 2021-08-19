import { HttpClient } from './http';
const TQ_API = HttpClient(process.env.TIANQI_BASE_API);
const API = HttpClient(process.env.API_BASE_URL);
import * as R from 'ramda';
const weatherDay = async (location) => {
  const res = await TQ_API.get('/3d', {
    location,
    key: process.env.WEATHER_KEY,
  });
  return res;
};

const news = async () => {
  const res = await API.get('/social/index', {
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

const story = async (type, word, page) => {
  const query = {
    num: 1,
    key: process.env.API_BASE_KEY,
    page,
  };
  if (type) Object.assign(query, { type });
  if (word) Object.assign(query, { word });

  const res = await API.get('/txapi/story/index', query);
  return R.head(res.newslist);
};

const fetchNews = async (path, word, page) => {
  const query = {
    num: 10,
    key: process.env.API_BASE_KEY,
    page,
  };
  if (word) Object.assign(query, { word });

  const res = await API.get(path, query);

  return res.newslist;
};

export { weatherDay, news, zhuawan, story, fetchNews };
