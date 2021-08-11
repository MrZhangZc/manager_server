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
import { ResourceService } from './resource.service';
import { deleteQiNiuSource } from '../../util';

import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('/resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  public async create(@Body() body) {
    return await this.resourceService.create(body);
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
}
