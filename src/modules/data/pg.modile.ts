/*
 * @Author: zzc 1761997216@qq.com
 * @Date: 2022-08-04 11:24:39
 * @LastEditors: zzc 1761997216@qq.com
 * @LastEditTime: 2022-08-04 11:39:54
 * @FilePath: /manager_server/src/modules/data/pg.modile.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Descripttion: mysql 连接配置
 * @Author: zzc
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource, Email, Article, Systemlog, Note, SiteCollection, Duty, Crawler, Study, StudyItem,
         Player,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: 5432,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [ Duty, Note, Resource, Email, Article, Systemlog, SiteCollection, Crawler, Study, StudyItem]
      // synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'game',
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: 5432,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE2,
      entities: [ Player ]
      // synchronize: true,
    }),
  ],
})
export class PgModule {}
