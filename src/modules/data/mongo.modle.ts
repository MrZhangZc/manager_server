/*
 * @Descripttion: redis 连接配置
 * @Author: zzc
 */
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('@meanie/mongoose-to-json'));
        return connection;
      },
    }),
  ]
})
export class MongoModule {}