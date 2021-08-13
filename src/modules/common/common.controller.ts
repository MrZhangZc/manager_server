import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
  Inject,
  LoggerService,
  Req,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveToQiNIu } from '../../util';
@UseGuards(AuthGuard('jwt'))
@Controller('/')
export class CommonController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  public async uploadFile(
    @UploadedFile() file: any,
    @Query() { type },
    @Req() req,
  ) {
    const res: any = await saveToQiNIu(file, type);
    if (res.key) {
      this.logger.log(`图片上传成功：${res.key}`, req.user.account);
    } else {
      this.logger.error(
        `图片上传失败：${JSON.stringify(res)}`,
        req.user.account,
      );
    }
    return res;
  }
}
