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
import { VisitorUserService } from './visitor.service';

import { Visitor } from '../../secmas';
import { AuthGuard } from '@nestjs/passport';
// @UseGuards(AuthGuard('jwt'))
@Controller('/blog/visitor')
export class VisitorController {
  constructor(private readonly visitorUserService: VisitorUserService) {}

  @Get()
  async userList(@Query() query) {
    return await this.visitorUserService.findList(query);
  }

  @Get('group')
  async groupUserList(@Query() query) {
    return await this.visitorUserService.findGroupList(query);
  }
}
