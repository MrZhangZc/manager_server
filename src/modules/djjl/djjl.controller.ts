import { DjjlService } from './djjl.service';
import { Controller, Get, Param, Post, Query, Body, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/djjl')
export class DjjlController {
  constructor(private readonly djjlService: DjjlService) {}
  
  @Get('player')
  public async getList(@Query() { currentPage, pageSize, type }) {
    const {list, total} = await this.djjlService.findAllPlayer(currentPage, pageSize, type);

    const res = await Promise.all(list.map(async item => {
        const [hero_info, sign_hero_info] = await Promise.all([
          this.djjlService.getHeroInfo(item.hero),
          this.djjlService.getHeroInfo(item.sign_hero),
        ])
        return {
          hero_info,
          sign_hero_info,
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
    const {list, total} = await this.djjlService.findAllGift(currentPage, pageSize);

    // const res = await Promise.all(list.map(async item => {
    //     const [hero_info, sign_hero_info] = await Promise.all([
    //       this.djjlService.getHeroInfo(item.hero),
    //       this.djjlService.getHeroInfo(item.sign_hero),
    //     ])
    //     return {
    //       hero_info,
    //       sign_hero_info,
    //       ...item
    //     }
    // }))
    return {
      list,
      total
    }
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
    console.log(1111111, id)
    return await this.djjlService.updateGiftById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.djjlService.deleteById(id);
  }
}
