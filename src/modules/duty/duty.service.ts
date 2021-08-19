import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Duty } from '../../entities';

@Injectable()
export class DutyService {
  @InjectRepository(Duty)
  private readonly DutyRep!: Repository<Duty>;

  public async create(body) {
    for (const duty of body) {
      await this.DutyRep.save(duty);
    }
    return 'success';
  }

  public async findMonthList(year, month) {
    return await this.DutyRep.find({
      where: {
        year,
        month,
      },
      order: {
        day: 'ASC',
      },
    });
  }

  public async find(start, length, id, name) {
    const where = {};
    if (id) Object.assign(where, { id });
    if (name) Object.assign(where, { name });

    const list = await this.DutyRep.findAndCount({
      where,
      order: {
        id: 'DESC',
      },
      skip: start,
      take: length,
    });
    return {
      list: list[0],
      total: list[1],
    };
  }

  public async updateById(id, body) {
    return await this.DutyRep.update({ id }, body);
  }

  public async deleteById(id) {
    return this.DutyRep.delete({ id });
  }
}
