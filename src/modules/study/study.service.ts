import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Study } from '../../entities';

@Injectable()
export class StudyService {
  @InjectRepository(Study)
  private readonly StudyRep!: Repository<Study>;

  public async create(body) {
    return await this.StudyRep.save(body);
  }

  public async find(start, length, id, name) {
    const where = {};
    if (id) Object.assign(where, { id });
    if (name) Object.assign(where, { name });

    const list = await this.StudyRep.findAndCount({
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
    return await this.StudyRep.update({ id }, body);
  }

  public async deleteById(id) {
    return this.StudyRep.delete({ id });
  }
}
