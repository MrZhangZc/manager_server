import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { Banner, BannerSecma } from '../../secmas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSecma }]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
