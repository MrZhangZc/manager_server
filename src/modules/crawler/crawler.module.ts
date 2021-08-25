import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { Article, Crawler } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClentServe } from '../../grpc/grpc.client.server';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Crawler])],
  controllers: [CrawlerController],
  providers: [CrawlerService, ClentServe],
})
export class CrawlerModule {}
