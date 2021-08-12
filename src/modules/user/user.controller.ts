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

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async userList(@Query() query) {
    return await this.userService.findList(query);
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
}
