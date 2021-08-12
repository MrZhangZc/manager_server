import * as cheerio from 'cheerio';
import axios from 'axios';
import * as iconv from 'iconv-lite';

const url = 'http://sports.163.com/special/nbagd2016/';
const url2 = 'http://sports.sina.com.cn/nba/';
const url3 = 'https://nba.hupu.com/';
const url4 = 'https://sports.qq.com/nba/';

const fetchNbaNews = async (keyword) => {
  const newsArry = [];
  const res = await axios.all([
    axios.get(url, {
      responseType: 'arraybuffer',
      transformResponse: [
        function (data) {
          const str = iconv.decode(Buffer.from(data), 'GBK');
          const html = iconv.encode(str, 'utf8').toString();
          return html;
        },
      ],
    }),
    axios.get(url2),
    axios.get(url3),
    axios.get(url4, {
      responseType: 'arraybuffer',
      transformResponse: [
        function (data) {
          const str = iconv.decode(Buffer.from(data), 'GBK');
          const html = iconv.encode(str, 'utf8').toString();
          return html;
        },
      ],
    }),
  ]);
  for (const item of res) {
    const KEYWORD_REG = new RegExp(keyword, 'i');
    const $ = cheerio.load(item.data);

    const news = $('a[href]');
    for (let i = 0; i < news.length; ++i) {
      const textHref = $(news[i]);
      const text = $(news[i]).text();

      if (KEYWORD_REG.test(text)) {
        newsArry.push({
          title: text.trim(),
          href: textHref.attr('href'),
        });
      }
    }
  }
  // const str = iconv.decode(Buffer.from(data), 'GBK');
  // const html = iconv.encode(str, 'utf8').toString();

  return {
    list: newsArry,
    totle: newsArry.length,
  };
};

export { fetchNbaNews };
