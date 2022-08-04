/*
 * @Descripttion: redis 连接配置
 * @Author: zzc
 */
import { Module } from '@nestjs/common'
import { RedisModule as Redis } from 'nestjs-redis'
@Module({
  imports: [
    Redis.register({
      url: process.env.REDIS_URL,
      onClientReady: (client) => {
        client.on('error', (err) => {
          console.log(err);
        });
      },
    }),
  ]
})
export class RedisModule {}