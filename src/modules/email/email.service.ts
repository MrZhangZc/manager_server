import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email, Resource } from '../../entities';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { weatherDay, news, zhuawan } from '../../util';

import * as path from 'path';
import * as R from 'ramda';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @InjectRepository(Email)
  private readonly emailRep: Repository<Email>;

  @InjectRepository(Resource)
  private readonly resourceRep: Repository<Resource>;

  public async list(currentPage, pageSize, type) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {};
    if (type) Object.assign(where, { type });
    const list = await this.emailRep.findAndCount({
      where,
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: pageSize,
    });
    return {
      list: list[0],
      total: list[1],
    };
  }

  @Cron('0 20 5 * * *')
  async sendEmail() {
    const sql = `select path from resource where type='email' ORDER BY RANDOM() LIMIT 1`;
    const sqlres = await this.resourceRep.query(sql);
    const imgurl = 'https://file.lihailezzc.com/' + sqlres[0].path;
    const [weather, newsRes, zwRes] = await Promise.all([
      weatherDay(process.env.M_LOCATION),
      news(),
      zhuawan(),
    ]);
    const newslist = newsRes.newslist;
    const weatherInfo = R.head(weather.daily);
    const { quest, result } = R.head(zwRes.newslist);
    const res = await this.mailerService.sendMail({
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROMUSER,
      subject: 'Love You √',
      template: path.join(__dirname, '/templates/email.pug'),
      context: {
        tempMax: weatherInfo.tempMax,
        tempMin: weatherInfo.tempMin,
        precip: weatherInfo.precip,
        humidity: weatherInfo.humidity,
        uvIndex: weatherInfo.uvIndex,
        newslist,
        quest,
        imgurl,
        username: process.env.EMAIL_USERNAME,
      },
    });
    if (res.accepted.length) {
      await this.emailRep.save({
        to: R.head(res.accepted),
        result: true,
        response: res,
        questres: result,
        quest,
      });
    } else {
      await this.emailRep.save({
        to: R.head(res.accepted),
        result: false,
        response: res,
        questres: result,
        quest,
      });
    }
  }

  public async sendmail(emailTo) {
    console.log(emailTo);
    const sql = `select path from resource where type='email' ORDER BY RANDOM() LIMIT 1`;
    const sqlres = await this.resourceRep.query(sql);
    const imgurl = 'https://file.lihailezzc.com/' + sqlres[0].path;
    const [weather, newsRes, zwRes] = await Promise.all([
      weatherDay(process.env.M_LOCATION),
      news(),
      zhuawan(),
    ]);
    const newslist = newsRes.newslist;
    const weatherInfo = R.head(weather.daily);
    const { quest, result } = R.head(zwRes.newslist);
    const res = await this.mailerService.sendMail({
      to: emailTo || process.env.EMAIL_TO,
      from: process.env.EMAIL_FROMUSER,
      subject: 'Love You √',
      template: path.join(__dirname, '/templates/email.pug'),
      context: {
        tempMax: weatherInfo.tempMax,
        tempMin: weatherInfo.tempMin,
        precip: weatherInfo.precip,
        humidity: weatherInfo.humidity,
        uvIndex: weatherInfo.uvIndex,
        newslist,
        quest,
        imgurl,
        username: process.env.EMAIL_USERNAME,
      },
    });
    if (res.accepted.length) {
      await this.emailRep.save({
        to: R.head(res.accepted),
        result: true,
        response: res,
        questres: result,
        quest,
      });
    } else {
      await this.emailRep.save({
        to: R.head(res.accepted),
        result: false,
        response: res,
        questres: result,
        quest,
      });
    }
    return '发送成功';
  }
}
