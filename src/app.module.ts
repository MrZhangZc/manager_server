import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import {
  VersionModule,
  UserAccessModule,
  UserModule,
  ArticleModule,
  CommonModule,
} from './modules';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      connectionFactory: (connection) => {
        connection.plugin(require('@meanie/mongoose-to-json'));
        return connection;
      },
    }),
    VersionModule,
    UserAccessModule,
    UserModule,
    ArticleModule,
    CommonModule,
  ],
})
export class AppModule {}
