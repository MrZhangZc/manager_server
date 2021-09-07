import { OauthService } from './oauth.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { getGithubUserInfo } from '../../util';
// import { AuthGuard } from '@nestjs/passport';
// @UseGuards(AuthGuard('jwt'))
@Controller('/oauth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService, // private readonly userLoginService: UserLoginService,
  ) {}

  @Get('/github')
  async githubOauth(@Query() query) {
    console.log({ query });
    const userInfo = await getGithubUserInfo(query?.code);
    if (userInfo.login) {
      let user: any = await this.oauthService.getUser({
        account: userInfo.login,
      });
      if (!user?.account) {
        const role = await this.oauthService.findRoleByQuery({
          access: 'oauth',
        });
        const body = {
          account: userInfo.login,
          role,
          avatar: userInfo.avatar_url,
          info: JSON.stringify(userInfo),
          from: 'github',
        };
        user = await this.oauthService.createUser(body);
      }
      return {
        token: await this.oauthService.getToken({
          account: user.account,
          id: user._id,
          role: user?.role?.access,
        }),
      };
    }
    return {
      state: 500,
      msg: 'github访问超时',
    };
  }
}
