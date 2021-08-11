import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { weatherDay } from '../util';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TasksService {
  constructor(private readonly mailerService: MailerService) {}

  // @Cron('45 * * * * *')
  // handleCron() {
  //   console.log('该方法将在45秒标记处每分钟运行一次');
  // }

  // @Interval(5000)
  // async handleInterval() {
  //   const res = await weatherDay(process.env.M_LOCATION);
  //   console.log(res);
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   console.log('3');
  // }

  // @Interval(10000)
  // sendEmail() {
  //   console.log('3');
  // }
}
