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

// const nbaSpider = function (email, KEYWORD) {
//   http.get(url, (res) => {
//     const html = '';
//     const bufferHelper = new BufferHelper();
//     res.on('data', (chunk) => {
//       bufferHelper.concat(chunk);
//     });
//     res.on('end', () => {
//       const KEYWORD_REG = new RegExp(KEYWORD, 'i');
//       const zzc = iconv.decode(bufferHelper.toBuffer(), 'GBK');
//       const $ = cheerio.load(zzc);
//       const news = $('a[href]');
//       for (let i = 0; i < news.length; ++i) {
//         const textHref = $(news[i]);
//         const text = $(news[i]).text();

//         if (KEYWORD_REG.test(text)) {
//           newsArry.push({
//             title: text.trim(),
//             href: textHref.attr('href'),
//           });
//         }
//       }
//       //console.log('213123', newsArry)
//       nbaSpiderqq(email, KEYWORD, newsArry);
//     });
//   });
// };
// const nbaSpiderqq = function (email, KEYWORD, newsArry) {
//   return axios.get(url3).then((response) => {
//     if (response.status === 200) {
//       const KEYWORD_REG = new RegExp(KEYWORD, 'i');
//       const $ = cheerio.load(response.data);

//       const news = $('a[href]');
//       for (let i = 0; i < news.length; ++i) {
//         const textHref = $(news[i]);
//         const text = $(news[i]).text();

//         if (KEYWORD_REG.test(text)) {
//           newsArry.push({
//             title: text.trim(),
//             href: textHref.attr('href'),
//           });
//         }
//       }
//     }
//     nbaSpidersina(email, KEYWORD, newsArry);
//   });
// };

// function nbaSpidersina(email, KEYWORD, newsArry) {
//   return axios.get(url2).then((response) => {
//     if (response.status === 200) {
//       const KEYWORD_REG = new RegExp(KEYWORD, 'i');
//       const $ = cheerio.load(response.data);

//       const news = $('a[href]');
//       for (let i = 0; i < news.length; ++i) {
//         const textHref = $(news[i]);
//         const text = $(news[i]).text();

//         if (KEYWORD_REG.test(text)) {
//           newsArry.push({
//             title: text.trim(),
//             href: textHref.attr('href'),
//           });
//         }
//       }
//       //console.log(newsArry)
//       //formStr(newsArry);
//     }

//     // function formStr(arr) {
//     //   let html = '';
//     //   for (const data of arr) {
//     //     html += `<p><a target="_blank" href="${data.href}">${data.title}</a></p>`; // red green blue
//     //   }
//     //   return html;
//     // }
//     // function sendEmail() {
//     //   const transporter = nodemailer.createTransport({
//     //     service: 'qq',
//     //     auth: {
//     //       user: '1761997216@qq.com', //user: 'jiayouzzc@126.com',	//
//     //       pass: 'riayndaegoliehgg', //pass: 'kobe241298'//
//     //     },
//     //   });

//     //   const mailOptions = {
//     //     from: '1761997216@qq.com', // 发送者
//     //     to: email, //'sonder.cc@gmail.com',//'jiayouzzc@126.com', // 接受者,可以同时发送多个,以逗号隔开
//     //     subject: `${KEYWORD}新闻`, // 标题
//     //     //text: 'Hello world', // 文本
//     //     html: `
//     //                 <h1>zzc找到以下新闻</h1>
//     //                 ${formStr(newsArry)}`,
//     //   };

//     //   transporter.sendMail(mailOptions, function (err, info) {
//     //     if (err) {
//     //       console.log(err);
//     //       return;
//     //     }

//     //     console.log('发送成功');
//     //   });
//     // }
//     // //		schedule.scheduleJob(SCHEDULE_RULE, () => {
//     // sendEmail();
//     // //		})
//   });
// }

// //nbaSpider()
// export default nbaSpider;
