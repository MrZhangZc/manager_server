import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Player, Hero, GiftDjjl, Skill } from 'src/entities';

@Injectable()
export class DjjlService {
  @InjectRepository(Player, 'game')
  private readonly playerRep: Repository<Player>;

  @InjectRepository(Hero, 'game')
  private readonly heroRep: Repository<Hero>;

  @InjectRepository(GiftDjjl, 'game')
  private readonly giftDjjlRep: Repository<GiftDjjl>;

  @InjectRepository(Skill, 'game')
  private readonly skillRep: Repository<Skill>;
  
  public async findAllPlayer(currentPage, pageSize, search) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {}
    if(search) Object.assign(where, {name: search})
    const info =  await this.playerRep.findAndCount({
      where: where,
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
  
  public async findAllGift(currentPage, pageSize) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const info =  await this.giftDjjlRep.findAndCount({
      order: {
        state: 'DESC',
        rank_num: 'ASC'
      },
      skip,
      take: pageSize,
    });

    return {
      list: info[0],
      total: info[1],
    };
  }

  public async findHeroList(currentPage, pageSize, search) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {}
    if(search) Object.assign(where, {name: Like(`%${search}%`)})
    const info =  await this.heroRep.findAndCount({
      where,
      order: {
        name: 'ASC',
      },
      skip,
      take: pageSize,
    });

    return {
      list: info[0],
      total: info[1],
    };
  }
  
  public async updatePlayerId(id, body) {
    return await this.playerRep.update(id, body);
  }

  public async updateHeroId(id, body) {
    return await this.heroRep.update(id, body);
  }

  public async findMaxRank() {
    const info =  await this.giftDjjlRep.findOne({
      order: {
        state: 'DESC',
        rank_num: 'DESC'
      }
    });

    return info?.rank_num + 1 || 1
  }

  public async createGift(body) {
    return await this.giftDjjlRep.save(body);
  }

  public async updateGiftById(id, body) {
    console.log(id, body)
    return await this.giftDjjlRep.update(id, body);
  }

  public async getHeroInfo(ids) {
    return await this.heroRep.find({
      where: {
        id: In(ids)
      },
      select: ['id', 'icon', 'name']
    })
  }

  public async getSkillInfo(ids) {
    return await this.skillRep.find({
      where: {
        id: In(ids)
      },
      select: ['id', 'icon', 'name', 'description']
    })
  }

  public async getAllHreo() {
    return await this.heroRep.find({
      select: ['id', 'icon', 'name'],
      order: {
        name: 'ASC'
      }
    })
  }

  public async getAllSkill() {
    return await this.skillRep.find({
      select: ['id', 'icon', 'name'],
      order: {
        name: 'ASC'
      }
    })
  }

  public async createPlayer(body) {
    return await this.playerRep.save(body);
  }

  public async createHero(body) {
    return await this.heroRep.save(body);
  }

  public async createSkill(body) {
    return await this.skillRep.save(body);
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
