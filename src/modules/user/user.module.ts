import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  User,
  UserSchema,
  Role,
  RoleSchema,
  Chat,
  ChatSecma,
} from '../../secmas';
import { UserLoginService } from './userlogin.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Chat.name, schema: ChatSecma },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserLoginService],
})
export class UserModule {}
