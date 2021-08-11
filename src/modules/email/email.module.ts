import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Email, Resource } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Email, Resource])],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
