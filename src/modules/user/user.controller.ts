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
import { CreateUserDto } from '../../dto';
import { UserService } from './user.service';
import { UserLoginService } from './userlogin.service';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userLoginService: UserLoginService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const role = await this.userService.findRoleByQuery({
      access: body.access,
    });
    if (!role) return { state: 400, msg: 'role error' };
    Object.assign(body, { role });
    return this.userService.createUser(body);
  }

  @Get()
  async userList(@Query() { currentPage, pageSize }) {
    return await this.userService.findList(currentPage, pageSize);
  }

  @Post('role')
  async createRole(@Body() body) {
    return await this.userService.createRole(body);
  }

  @Get('role')
  async roleList(@Query() query) {
    return await this.userService.findRole(query);
  }

  @Delete('role/:id')
  async deleteRole(@Param() { id }) {
    await this.userService.deleteRole(id);
    return 'success';
  }

  // 用户登陆统计
  @Get('login/stat')
  public async userLoginStat(
    @Query()
    {
      currentPage,
      pageSize,
      year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
    },
  ) {
    const { list, count } = await this.userService.findList(
      currentPage,
      pageSize,
    );
    const res = await Promise.all(
      list.map(async (item) => {
        return {
          account: item.account,
          role: item.role,
          createdAt: item['createdAt'],
          loginTimes: await this.userLoginService.getUserLoginTimes(
            item.id,
            year,
            month,
          ),
          userRecentlyLogin: await this.userLoginService.getUserEarliestLogin(
            item.id,
            year,
            month,
          ),
        };
      }),
    );
    return {
      list: res,
      count,
    };
  }
}
