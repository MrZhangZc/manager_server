import { HttpClient } from './http';
const BD_API = HttpClient(process.env.BD_BASE_API);

const getBDAccessToken = async () => {
  const token = await BD_API.get('/oauth/2.0/token', {
    grant_type: 'client_credentials',
    client_id: process.env.BD_API_Key,
    client_secret: process.env.BD_Secret_Key,
  });
  return token?.access_token;
};

const characterRecognition = async (url, options = {}) => {
  const access_token = await getBDAccessToken();
  const res = await BD_API.json(
    `/rest/2.0/ocr/v1/accurate_basic?access_token=${access_token}`,
    { url, ...options },
  );
  return res;
};

export { getBDAccessToken, characterRecognition };
