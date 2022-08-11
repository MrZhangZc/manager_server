import { DjjlService } from './djjl.service';
import { Controller, Get, Param, Post, Query, Body, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/djjl')
export class DjjlController {
  constructor(private readonly djjlService: DjjlService) {}
  
  @Get('player')
  public async getList(@Query() { currentPage, pageSize, search }) {
    const {list, total} = await this.djjlService.findAllPlayer(currentPage, pageSize, search);

    const res = await Promise.all(list.map(async item => {
        const [hero_info, sign_hero_info, skill_info] = await Promise.all([
          this.djjlService.getHeroInfo(item.hero),
          this.djjlService.getHeroInfo(item.sign_hero),
          this.djjlService.getSkillInfo(item.skill),
        ])
        return {
          hero_info,
          sign_hero_info,
          skill_info,
          ...item
        }
    }))
    return {
      list:res,
      total
    }
  }

  @Get('gift')
  public async getGiftList(@Query() { currentPage, pageSize }) {
    return await this.djjlService.findAllGift(currentPage, pageSize);
  }

  @Get('hero')
  public async getHeroList(@Query() { currentPage, pageSize, search }) {
    return await this.djjlService.findHeroList(currentPage, pageSize, search);
  }

  @Post('player')
  public async addPlayer(@Body() body) {
    return await this.djjlService.createPlayer(body);
  }

  @Post('hero')
  public async addHero(@Body() body) {
    return await this.djjlService.createHero(body);
  }

  @Put('hero/:id')
  public async updateHero(@Param() { id }, @Body() body) {
    return await this.djjlService.updateHeroId(id, body);
  }

  @Put('player/:id')
  public async updatePlayer(@Param() { id }, @Body() body) {
    return await this.djjlService.updatePlayerId(id, body);
  }

  @Post('gift')
  public async create(@Body() body) {
    // Object.assign
    const maxRank = await this.djjlService.findMaxRank()
    Object.assign(body, { rank_num: maxRank, state: 0 })
    return await this.djjlService.createGift(body);
  }

  @Put('gift/:id')
  public async update(@Param() { id }, @Body() body) {
    return await this.djjlService.updateGiftById(id, body);
  }

  @Get('all_hero')
  public async allHreo() {
    return await this.djjlService.getAllHreo()
  }

  @Get('all_skill')
  public async allSkill() {
    return await this.djjlService.getAllSkill()
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.djjlService.deleteById(id);
  }
}
