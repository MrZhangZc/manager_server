import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAccessController } from './user_access.controller';
import { UserAccessService } from './user_access.service';
import { User, UserSchema, Role, RoleSchema } from '../../secmas';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [UserAccessController],
  providers: [UserAccessService, JwtStrategy],
})
export class UserAccessModule {}
