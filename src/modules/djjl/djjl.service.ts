import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/entities';

@Injectable()
export class DjjlService {
  @InjectRepository(Player, 'game')
  private readonly playerRep: Repository<Player>;
  
  public async findAllPlayer() {
    const info =  await this.playerRep.findAndCount({
      order: {
        quality: 'ASC'
      }
    });

    return {
      list: info[0],
      total: info[1],
    };
  }

  public async create(body) {
    return await this.playerRep.create(body);
  }

  public async find() {
    const list = await this.playerRep.find({});
    return {
      list: list,
      total: list.length,
    };
  }

  public async updateById(id, body) {
    return await this.playerRep.update(id, body);
  }

  public async deleteById(id) {
    return await this.playerRep.delete(id);
  }
}
