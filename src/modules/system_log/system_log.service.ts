import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Systemlog } from '../../entities';
import { Blogsystemlog } from '../../secmas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SystemLogService {
  constructor(
    @InjectModel(Blogsystemlog.name)
    private readonly blogsystemlog: Model<Blogsystemlog>,
  ) {}

  @InjectRepository(Systemlog)
  private readonly systemlogRep: Repository<Systemlog>;

  public async create(body) {
    return await this.systemlogRep.save(body);
  }

  public async find(query) {
    const where = {};
    const { currentPage, pageSize } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    if (query?.timeRange?.length) {
      const [start, end] = query.timeRange;
      Object.assign(where, {
        createdAt: Between(start, end),
      });
    }
    const list = await this.systemlogRep.findAndCount({
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

  public async updateById(id, body) {
    return await this.systemlogRep.update({ id }, body);
  }

  public async deleteById(id) {
    return this.systemlogRep.delete({ id });
  }

  async findBlogList(query) {
    const { currentPage, pageSize, type } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {};
    if (type) Object.assign(where, { type });
    if (query?.timeRange?.length) {
      const [start, end] = query.timeRange;
      Object.assign(where, { createdAt: { $gte: start, $lt: end } });
    }
    const res = await this.blogsystemlog
      .find(where)
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .exec();
    const count = await this.blogsystemlog.countDocuments(where);
    return {
      list: res,
      count,
    };
  }

  async findBlogGroup(query) {
    const match = {};
    if (query?.timeRange?.length) {
      const [start, end] = query.timeRange;
      Object.assign(match, {
        createdAt: { $gte: new Date(start), $lt: new Date(end) },
      });
    }
    let aggregateOpts = [];
    const type = query?.type || 'day';
    if (type === 'day') {
      aggregateOpts = [
        {
          $project: {
            day: { $substr: [{ $add: ['$createdAt', 28800000] }, 0, 10] }, //时区数据校准，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分组
          },
        },
        {
          $group: {
            _id: '$day',
            content_sum: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ];
    } else {
      aggregateOpts = [
        {
          $group: {
            _id: '$' + type,
            content_sum: { $sum: 1 },
          },
        },
      ];
    }
    const res = await this.blogsystemlog.aggregate([
      { $match: match },
      ...aggregateOpts,
    ]);
    return res;
  }
}
