import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { Resource } from '../../entities';
import { ClentServe } from '../../grpc/grpc.client.server';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourceController],
  providers: [ResourceService, ClentServe],
})
export class ResourceModule {}
