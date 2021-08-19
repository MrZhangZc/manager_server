import { Module } from '@nestjs/common';
import { ClockinController } from './clockin.controller';
import { ClockinService } from './clockin.service';
import { User, UserSchema, Role, RoleSchema } from '../../secmas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [ClockinController],
  providers: [ClockinService],
})
export class ClockinModule {}
