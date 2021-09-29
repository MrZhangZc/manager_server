import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudyController } from './study.controller';
import { StudyService } from './study.service';
import { Study, StudyItem } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyItem])],
  controllers: [StudyController],
  providers: [StudyService],
})
export class StudyModule {}
