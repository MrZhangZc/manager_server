import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Player, Hero } from 'src/entities';

@Injectable()
export class DjjlService {
  @InjectRepository(Player, 'game')
  private readonly playerRep: Repository<Player>;

  @InjectRepository(Hero, 'game')
  private readonly heroRep: Repository<Hero>;
  
  public async findAllPlayer(currentPage, pageSize, type) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const info =  await this.playerRep.findAndCount({
      order: {
        quality: 'ASC'
      },
      skip,
      take: pageSize,
    });

    return {
      list: info[0],
      total: info[1],
    };
  }
  

  public async getHeroInfo(ids) {
    return await this.heroRep.find({
      where: {
        id: In(ids)
      },
      select: ['id', 'icon', 'name']
    })
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
