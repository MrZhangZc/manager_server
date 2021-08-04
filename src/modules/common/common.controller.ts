import * as fs from 'fs';
import { resolve } from 'path';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveToQiNIu } from '../../util';

@UseGuards(AuthGuard('jwt'))
@Controller('/')
export class CommonController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  public async uploadFile(@UploadedFile() file: any) {
    return await saveToQiNIu(file);
  }
}
