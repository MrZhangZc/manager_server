import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, Crawler } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlerService {
  @InjectRepository(Article)
  private readonly articleRep: Repository<Article>;

  @InjectRepository(Crawler)
  private readonly crawlerRep: Repository<Crawler>;

  public async create(body: any) {
    return await this.articleRep.save(body);
  }

  public async findOne(id) {
    return await this.articleRep.findOne({ id });
  }

  public async deleteOne(id) {
    return await this.articleRep.delete({ id });
  }

  public async list(currentPage, pageSize, type) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {};
    if (type) Object.assign(where, { type });
    const list = await this.articleRep.findAndCount({
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

  public async crawlerList(currentPage, pageSize, type, from) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {};
    if (type) Object.assign(where, { type });
    if (from) Object.assign(where, { from });
    const list = await this.crawlerRep.findAndCount({
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
}
