import { NoteService } from './note.service';
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
@Controller('/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  public async create(@Body() body) {
    return await this.noteService.create(body);
  }

  @Get()
  public async getList(@Query() { start, length, id, name }) {
    return await this.noteService.find(start, length, id, name);
  }

  @Patch(':id')
  public async updateStatus(@Param() { id }, @Body() body) {
    return await this.noteService.updateById(id, body);
  }

  @Put('edit/:id')
  public async update(@Param() { id }, @Body() body) {
    return await this.noteService.updateById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.noteService.deleteById(id);
  }
}
