import { StudyService } from './study.service';
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

// @UseGuards(AuthGuard('jwt'))
@Controller('/study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Post()
  public async create(@Body() body) {
    return await this.studyService.create(body);
  }

  @Get()
  public async getList(@Query() { start, length, id, name }) {
    return await this.studyService.find(start, length, id, name);
  }

  @Patch(':id')
  public async updateStatus(@Param() { id }, @Body() body) {
    return await this.studyService.updateById(id, body);
  }

  @Put('edit/:id')
  public async update(@Param() { id }, @Body() body) {
    return await this.studyService.updateById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.studyService.deleteById(id);
  }
}
