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
  Req,
  UseGuards,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ResourceService } from '../resource/resource.service';

import { AuthGuard } from '@nestjs/passport';
import { getBDAccessToken, characterRecognition } from '../../util';

@UseGuards(AuthGuard('jwt'))
@Controller('/db')
export class BaiduController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly resourceService: ResourceService,
  ) {}

  @Get('token')
  async getToken() {
    return await getBDAccessToken();
  }

  @Get('ocr')
  async photo(@Query() { path }, @Req() req) {
    this.logger.log(`图片文字识别：${path}`, req.user.account);
    const res = await characterRecognition(path);
    if (res.words_result) {
      const resultArr = res.words_result.map((item) => item.words);
      this.resourceService.create({
        type: 'ocr',
        path: path.slice(28),
        desc: '图片识别成功',
      });
      return resultArr.join('');
    } else {
      this.resourceService.create({
        type: 'ocr',
        path: path.slice(28),
        desc: '图片识别失败',
      });
      this.logger.error(
        `图片解析失败 ${JSON.stringify(res)}`,
        req.user.account,
      );
      return { state: 500, msg: '图片解析失败' };
    }
  }
}
