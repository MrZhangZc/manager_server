import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../../entities';
import { EmailService } from '../email/email.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { RedisService } from 'nestjs-redis';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
@Injectable()
export class NoteService {
  public client;
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly emailService: EmailService,
    private readonly redisService: RedisService,
  ) {
    this.getClient();
  }

  async getClient() {
    this.client = await this.redisService.getClient();
  }

  @InjectRepository(Note)
  private readonly noteRep: Repository<Note>;

  public async create(body) {
    return await this.noteRep.save(body);
  }

  public async find(start, length, type, showAll) {
    let where: any = { finish: false };
    if (showAll === 'true') {
      where = {};
    } else {
      where = { finish: false };
    }
    if (type) Object.assign(where, { type });

    const list = await this.noteRep.findAndCount({
      where,
      order: {
        finish: 'ASC',
        createdAt: 'DESC',
      },
      skip: start - 1,
      take: length,
    });
    return {
      list: list[0],
      total: list[1],
    };
  }

  public async updateById(id, body) {
    return await this.noteRep.update({ id }, body);
  }

  public async deleteById(id) {
    return this.noteRep.delete({ id });
  }

  public async remindSend(id) {
    const note = await this.noteRep.findOne({ id });
    if (!note || note.type !== 'remind') return { state: 404, msg: '未找到' };
    const res = await this.emailService.send(
      note.remind_to,
      '立即提醒',
      `${note.desc} 备注：${note.addition || '无'}`,
    );
    return res;
  }

  // 定时提醒任务处理
  async saveRemindTask(note) {
    const remindTime = +new Date(note.remind_time);
    await this.client.zadd('remindTask', remindTime, note.id);
  }

  @Interval(30000)
  async findNeedRunTask() {
    const now = Date.now();
    const tasks = await this.client.zrangebyscore('remindTask', 0, now);
    if (tasks?.length) {
      for (const task of tasks) {
        this.logger.log(`找到定时邮件任务:${task}`);
        const note = await this.noteRep.findOne({ id: task });
        await this.emailService.send(
          note.remind_to,
          '到时提醒',
          `${note.desc} 备注：${note.addition || '无'}`,
        );
        await sleep(1000);
        this.logger.log(`定时邮件成功发送:${task}`);
        await this.client.zrem('remindTask', task);
        this.logger.log(`定时邮件缓存任务删除:${task}`);
        await this.noteRep.update({ id: task }, { remind_out: true });
      }
    }
  }
}
