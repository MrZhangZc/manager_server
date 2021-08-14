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
  public client;
  constructor(private readonly noteService: NoteService) {}
  @Post()
  public async create(@Body() body) {
    const res = await this.noteService.create(body);
    if (res.type === 'remind') {
      this.noteService.saveRemindTask(res);
    }
    return res;
  }

  @Get()
  public async getList(@Query() { start, length, type, showAll }) {
    return await this.noteService.find(start, length, type, showAll);
  }

  @Get('remind/:id')
  public async remind(@Param() { id }) {
    return await this.noteService.remindSend(id);
  }

  @Patch(':id')
  public async updateStatus(@Param() { id }, @Body() body) {
    return await this.noteService.updateById(id, body);
  }

  @Patch('finish/:id')
  public async updateFinish(@Param() { id }) {
    return await this.noteService.updateById(id, { finish: true });
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
