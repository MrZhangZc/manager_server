import axios from 'axios';

const getHtmlContent = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export { getHtmlContent };
