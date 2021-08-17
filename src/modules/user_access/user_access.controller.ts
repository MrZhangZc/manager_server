import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserAccessService } from './user_access.service';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from 'nestjs-redis';
import KEY from '../../constant/key';
@Controller('/')
export class UserAccessController {
  public client;
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly userAccessService: UserAccessService,
    private readonly redisService: RedisService,
  ) {
    this.getClient();
  }

  async getClient() {
    this.client = await this.redisService.getClient();
  }

  @Post('login')
  async login(@Body() { account, password }: any) {
    this.logger.log(`用户登陆 ${account}`);
    const user: any = await this.userAccessService.findUser({ account });
    if (!user) return { state: 400, msg: '用户名或密码错误' };
    const trueUser = await user.conparePassword(password);
    if (!trueUser) return { state: 400, msg: '用户名或密码错误' };
    this.client.setbit(
      `${KEY.User_Login}${new Date().getFullYear()}_${
        new Date().getMonth() + 1
      }_${user.id}`,
      new Date().getDate(),
      1,
    );
    return {
      token: await this.userAccessService.getToken({
        account,
        id: user._id,
        role: user.role.access,
      }),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout() {
    return 'success';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/current')
  async current(@Request() request) {
    return await this.userAccessService.findUser({
      account: request.user.account,
    });
  }
}
