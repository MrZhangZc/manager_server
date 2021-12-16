import { BannerService } from './banner.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  public async create(@Body() body) {
    return await this.bannerService.create(body);
  }

  @Get()
  public async getList() {
    return await this.bannerService.find();
  }

  @Put(':id')
  public async update(@Param() { id }, @Body() body) {
    return await this.bannerService.updateById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.bannerService.deleteById(id);
  }
}
