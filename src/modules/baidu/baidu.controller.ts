import * as fs from 'fs';
import { resolve } from 'path';
import {
  Controller,
  Get,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { getBDAccessToken, characterRecognition } from '../../util';

@UseGuards(AuthGuard('jwt'))
@Controller('/db')
export class BaiduController {
  @Get('token')
  async getToken() {
    return await getBDAccessToken();
  }

  @Get('ocr')
  async photo(@Query() { path }) {
    const res = await characterRecognition(path);
    if (res.words_result) {
      const resultArr = res.words_result.map((item) => item.words);
      return resultArr.join('');
    }
    return { state: 500, msg: '图片解析失败' };
  }
}
