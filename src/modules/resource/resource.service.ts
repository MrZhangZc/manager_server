import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  @InjectRepository(Resource)
  private readonly resourceRep: Repository<Resource>;

  public async create(body: any) {
    return await this.resourceRep.save(body);
  }

  public async findOne(id) {
    return await this.resourceRep.findOne({ id });
  }

  public async deleteOne(id) {
    return await this.resourceRep.delete({ id });
  }

  public async list(currentPage, pageSize, type) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {};
    if (type) Object.assign(where, { type });
    const list = await this.resourceRep.findAndCount({
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
