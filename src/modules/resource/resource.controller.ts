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
  Request,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { deleteQiNiuSource, uploadFileByUrl } from '../../util';

import { AuthGuard } from '@nestjs/passport';
import { ClentServe } from '../../grpc/grpc.client.server';
@UseGuards(AuthGuard('jwt'))
@Controller('/resource')
export class ResourceController {
  private newsService: any;
  constructor(
    @Inject(ClentServe) private readonly clentServe: ClentServe,
    private readonly resourceService: ResourceService,
  ) {}

  onModuleInit() {
    this.newsService = this.clentServe.client.getService('News');
  }

  @Post()
  public async create(@Body() body) {
    return await this.resourceService.create(body);
  }

  @Post('url')
  public async createUrl(@Body() body) {
    const { url, prefix } = body;
    const path = await uploadFileByUrl(url, prefix);
    return await this.resourceService.create({
      type: 'url',
      path,
      desc: '通过url直接上传',
    });
  }

  @Get()
  public async list(@Query() { currentPage, pageSize, type }) {
    return await this.resourceService.list(currentPage, pageSize, type);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    const resource = await this.resourceService.findOne(id);
    const res: any = await deleteQiNiuSource(resource.path);
    if (res?.statusCode === 200) {
      await this.resourceService.deleteOne(id);
    }
    return 'success';
  }

  @Get('screenShot')
  public async screenShot(@Query() { href, id }) {
    const res = await this.newsService.screenShot({ url: href, dataId: id });
    return res;
    // return await this.resourceService.list(currentPage, pageSize, type);
  }
}
