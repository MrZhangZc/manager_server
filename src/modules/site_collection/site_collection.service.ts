import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteCollection } from '../../entities';

@Injectable()
export class SiteCollectionService {
  @InjectRepository(SiteCollection)
  private readonly SiteCollectionRep!: Repository<SiteCollection>;

  public async create(body) {
    return await this.SiteCollectionRep.save(body);
  }

  public async find(start, length, type) {
    const where = {};
    if (type) Object.assign(where, { type });

    const list = await this.SiteCollectionRep.findAndCount({
      where,
      order: {
        id: 'DESC',
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
    return await this.SiteCollectionRep.update({ id }, body);
  }

  public async deleteById(id) {
    return this.SiteCollectionRep.delete({ id });
  }

  public async getAllType() {
    const sql = 'SELECT type from site_collection group BY type';
    const res = await this.SiteCollectionRep.query(sql);
    return res;
  }
}
