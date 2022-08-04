import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DjjlController } from './djjl.controller';
import { DjjlService } from './djjl.service';
import { Player } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Player], 'game')],
  controllers: [DjjlController],
  providers: [DjjlService],
})
export class DjjlModule {}
