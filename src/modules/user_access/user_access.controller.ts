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
} from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/')
export class UserAccessController {
  constructor(
    private readonly userAccessService: UserAccessService,
  ) {}

  @Post('login')
  async login(@Body() {account, password}: any) {
    const user:any = await this.userAccessService.findUser({account});
    if(!user) return { state: 400, msg: '用户名或密码错误'};
    const trueUser = await user.conparePassword(password)
    if(!trueUser) return { state: 400, msg: '用户名或密码错误'};
    return {
      token: await this.userAccessService.getToken({
        account,
        id: user._id,
        role: user.role.access,
      }),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/current')
  async current(@Request() request) {
    return await this.userAccessService.findUser({ account: request.user.account });
  }
}
