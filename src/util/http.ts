import axios, { AxiosInstance } from 'axios';
import * as qs from 'qs';
interface IResponse {
  status: number;
  statusText: string;
  data: {
    type: 'success' | 'fail' | 'info';
    message: string;
    [key: string]: any;
  };
}

class Request {
  static instance: Request;
  request: AxiosInstance;

  constructor(url: string) {
    this.request = axios.create({ baseURL: url });
  }

  public async get(
    path: string,
    query: { [key: string]: any },
  ): Promise<{ [key: string]: any }> {
    const url = (path += query ? `?${qs.stringify(query)}` : '');
    let result = {};

    try {
      const { data: response }: IResponse = await this.request.get(url);
      result = response;
    } catch (err) {
      console.error(err);
    }

    return result;
  }

  public async post(
    path: string,
    data: { [key: string]: any },
  ): Promise<{ [key: string]: any }> {
    const url = path;
    let result = {};

    try {
      const { data: response }: IResponse = await this.request.post(url, data);

      result = response;
    } catch (err) {
      console.error(err);
    }

    return result;
  }

  public async json(
    path: string,
    data: { [key: string]: any },
  ): Promise<{ [key: string]: any }> {
    const url = path;
    let result = {};

    try {
      const { data: response }: IResponse = await this.request.post(
        url,
        qs.stringify(data),
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
      );
      result = response;
    } catch (err) {
      console.error(err);
    }

    return result;
  }
}

export const HttpClient = (url: string) => new Request(url);
