import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorController } from './visitor.controller';
import { VisitorUserService } from './visitor.service';
import { VisitorSchema, Visitor } from '../../secmas';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  ],
  controllers: [VisitorController],
  providers: [VisitorUserService],
})
export class VisitorModule {}
