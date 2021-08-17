import { SiteCollectionService } from './site_collection.service';
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
@Controller('/site')
export class SiteCollectionController {
  constructor(private readonly siteCollectionService: SiteCollectionService) {}

  @Post()
  public async create(@Body() body) {
    return await this.siteCollectionService.create(body);
  }

  @Get()
  public async getList(@Query() { start, length, type }) {
    return await this.siteCollectionService.find(start, length, type);
  }

  @Get('type')
  public async getType() {
    return await this.siteCollectionService.getAllType();
  }

  @Patch(':id')
  public async updateStatus(@Param() { id }, @Body() body) {
    return await this.siteCollectionService.updateById(id, body);
  }

  @Put('edit/:id')
  public async update(@Param() { id }, @Body() body) {
    return await this.siteCollectionService.updateById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.siteCollectionService.deleteById(id);
  }
}
