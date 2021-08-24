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
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AuthGuard } from '@nestjs/passport';
import { CrawlerService } from './crawler.service';
import { fetchNbaNews } from '../../util';

import { ClentServe } from '../../grpc/grpc.client.server';

@UseGuards(AuthGuard('jwt'))
@Controller('/crawler')
export class CrawlerController {
  private newsService: any;
  constructor(
    @Inject(ClentServe) private readonly clentServe: ClentServe,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly crawlerService: CrawlerService,
  ) {}

  onModuleInit() {
    this.newsService = this.clentServe.client.getService('News');
  }

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
  public async nba(@Query() { keyword }, @Req() req) {
    this.logger.log(`获取nba新闻: ${keyword}`, req.user.account);
    return await fetchNbaNews(keyword);
  }

  @Get('it')
  public async it(@Query() { keyword }, @Req() req) {
    const res = await this.newsService.getNabNews({ keyword });
    return res;
  }
}
