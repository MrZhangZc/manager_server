// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './schedule/tasks.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Resource, Email, Article } from './entities';
import {
  VersionModule,
  UserAccessModule,
  UserModule,
  ArticleModule,
  CommonModule,
  BaiduModule,
  VisitorModule,
  ResourceModule,
  EmailModule,
  CrawlerModule,
  ApiModule,
} from './modules';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: 5432,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [Resource, Email, Article],
      // synchronize: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('@meanie/mongoose-to-json'));
        return connection;
      },
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.EMAIL_TRANSPORT,
        defaults: {
          from: process.env.EMAIL_FROM,
        },
        template: {
          // dir: path.join(process.cwd(), '/src/templates/'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    VersionModule,
    UserAccessModule,
    UserModule,
    ArticleModule,
    CommonModule,
    BaiduModule,
    VisitorModule,
    ResourceModule,
    EmailModule,
    CrawlerModule,
    ApiModule,
  ],
  providers: [TasksService],
})
export class AppModule {}
