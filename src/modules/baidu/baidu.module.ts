import { Module } from '@nestjs/common';
import { BaiduController } from './baidu.controller';

@Module({
  imports: [],
  controllers: [BaiduController],
})
export class BaiduModule {}
