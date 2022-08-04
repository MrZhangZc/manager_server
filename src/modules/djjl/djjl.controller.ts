import { DjjlService } from './djjl.service';
import { Controller, Get, Param, Post, Query, Body, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/djjl')
export class DjjlController {
  constructor(private readonly djjlService: DjjlService) {}
  
  @Get('player')
  public async getList() {
    return await this.djjlService.findAllPlayer();
  }

  @Post()
  public async create(@Body() body) {
    return await this.djjlService.create(body);
  }

  @Put(':id')
  public async update(@Param() { id }, @Body() body) {
    return await this.djjlService.updateById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.djjlService.deleteById(id);
  }
}
