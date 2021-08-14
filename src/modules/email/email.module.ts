import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Email, Resource } from '../../entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Email, Resource])],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
