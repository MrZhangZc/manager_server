import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SiteCollectionController } from './site_collection.controller';
import { SiteCollectionService } from './site_collection.service';
import { SiteCollection } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([SiteCollection])],
  controllers: [SiteCollectionController],
  providers: [SiteCollectionService],
})
export class SiteCollectionModule {}
