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
    return {
      list: res,
      count: res.length,
    };
  }
}
