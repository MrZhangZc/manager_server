import { SystemLogService } from './system_log.service';
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
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/log')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Get('cms')
  public async getList(@Query() query) {
    return await this.systemLogService.find(query);
  }

  @Get('blog')
  public async getBlogLogList(@Query() query) {
    return await this.systemLogService.findBlogList(query);
  }
}
