import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import KEY from '../../constant/key';
@Injectable()
export class UserLoginService {
  private client;
  constructor(private readonly redisService: RedisService) {
    this.getClient();
  }

  private async getClient() {
    this.client = await this.redisService.getClient();
  }

  public async getUserLoginTimes(userId, year, month) {
    return await this.client.bitcount(
      `${KEY.User_Login}${year}_${month}_${userId}`,
    );
  }

  public async getUserEarliestLogin(userId, year, month) {
    return await this.client.bitpos(
      `${KEY.User_Login}${year}_${month}_${userId}`,
      1,
    );
  }
}
