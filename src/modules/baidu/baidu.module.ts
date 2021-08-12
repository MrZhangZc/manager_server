import { Module } from '@nestjs/common';
import { BaiduController } from './baidu.controller';
import { Resource } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from '../resource/resource.service';
@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [BaiduController],
  providers: [ResourceService],
})
export class BaiduModule {}
