import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CrawlerService } from './crawler.service';
import { fetchNbaNews } from '../../util';

@UseGuards(AuthGuard('jwt'))
@Controller('/crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post()
  public async saveNesw(@Body() body) {
    return await this.crawlerService.create(body);
  }

  @Get()
  public async news(@Query() { currentPage, pageSize, type }) {
    return await this.crawlerService.list(currentPage, pageSize, type);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    const resource = await this.crawlerService.findOne(id);
    if (resource) {
      await this.crawlerService.deleteOne(id);
      return 'success';
    } else {
      return { state: 500, msg: '删除失败' };
    }
  }

  @Get('nba')
  public async nba(@Query() { keyword }) {
    return await fetchNbaNews(keyword);
  }
}
