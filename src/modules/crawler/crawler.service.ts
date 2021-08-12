import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlerService {
  @InjectRepository(Article)
  private readonly articleRep: Repository<Article>;

  public async create(body: any) {
    console.log(body);
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
}
