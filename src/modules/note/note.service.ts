import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../../entities';

@Injectable()
export class NoteService {
  @InjectRepository(Note)
  private readonly noteRep: Repository<Note>;

  public async create(body) {
    return await this.noteRep.save(body);
  }

  public async find(start, length, id, name) {
    const where = {};
    if (id) Object.assign(where, { id });
    if (name) Object.assign(where, { name });

    const list = await this.noteRep.findAndCount({
      where,
      order: {
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
}
