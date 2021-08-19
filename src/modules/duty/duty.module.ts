import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DutyController } from './duty.controller';
import { DutyService } from './duty.service';
import { Duty } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Duty])],
  controllers: [DutyController],
  providers: [DutyService],
})
export class DutyModule {}
