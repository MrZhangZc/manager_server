import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema, OauthUserSchema, OauthUser } from '../../secmas';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../user_access/jwt.strategy';

// import { Note } from '../../entities';

@Module({
  // imports: [TypeOrmModule.forFeature([Note])],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '12h',
      },
    }),
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: OauthUser.name, schema: OauthUserSchema },
    ]),
  ],
  controllers: [OauthController],
  providers: [OauthService, JwtStrategy],
})
export class OauthModule {}
