import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { SystemLogController } from './system_log.controller';
import { SystemLogService } from './system_log.service';
import { Systemlog } from '../../entities';
import { Blogsystemlog, BlogsystemlogSecma } from '../../secmas';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Systemlog]),
    MongooseModule.forFeature([
      { name: Blogsystemlog.name, schema: BlogsystemlogSecma },
    ]),
  ],
  controllers: [SystemLogController],
  providers: [SystemLogService],
  exports: [SystemLogService],
})
export class SystemLogModule {}
