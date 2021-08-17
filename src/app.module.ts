// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './schedule/tasks.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { RedisModule } from 'nestjs-redis';
import {
  Resource,
  Email,
  Article,
  Systemlog,
  Note,
  SiteCollection,
} from './entities';
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
  SystemLogModule,
  NoteModule,
  SiteCollectionModule,
} from './modules';
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    ScheduleModule.forRoot(),
    RedisModule.register({
      url: process.env.REDIS_URL,
      onClientReady: (client) => {
        client.on('error', (err) => {
          console.log(err);
        });
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: 5432,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [Note, Resource, Email, Article, Systemlog, SiteCollection],
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
    // ---- InsertModel ----
    SiteCollectionModule,
    NoteModule,
    SystemLogModule,
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
