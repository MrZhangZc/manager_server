import { HttpClient } from './http';
const GitHub_API = HttpClient(process.env.GITHUB_BASE);
const GitHub_Info_API = HttpClient(process.env.GITHUB_INFO_BASE);
import * as qs from 'qs';

const getGithubUserInfo = async (code) => {
  const res = await GitHub_API.get(`/login/oauth/access_token`, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  });
  const token = qs.parse(res).access_token;
  const userInfo = await GitHub_Info_API.get(
    `/user`,
    {},
    {
      headers: {
        'User-Agent': 'Awesome-Octocat-App',
        Authorization: `token ${token}`,
      },
    },
  );
  console.log(userInfo);
  return userInfo;
};

export { getGithubUserInfo };
