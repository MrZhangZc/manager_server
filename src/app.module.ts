// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { TasksService } from './schedule/tasks.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import {
  RedisModule, PgModule, MongoModule, 
  VersionModule, UserAccessModule, UserModule, ArticleModule, 
  CommonModule, BaiduModule, VisitorModule, ResourceModule, EmailModule, CrawlerModule, ApiModule, SystemLogModule, NoteModule, SiteCollectionModule, DutyModule, ClockinModule, OauthModule, StudyModule, BannerModule,
  DjjlModule
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
    RedisModule,
    PgModule,
    MongoModule,
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
    BannerModule,
    StudyModule,
    ClockinModule,
    DutyModule,
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
    OauthModule,
    ApiModule,

    DjjlModule
  ],
  providers: [TasksService],
})
export class AppModule {}
