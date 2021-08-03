import * as fs from 'fs';
import { resolve } from 'path';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { saveToQiNIu } from '../../util';

@Controller('/')
export class CommonController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  public async uploadFile(@UploadedFile() file: any) {
    return await saveToQiNIu(file);
  }
}
