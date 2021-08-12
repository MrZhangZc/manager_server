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
  Req,
  Request,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('/task')
export class EmailController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly emailService: EmailService,
  ) {}

  @Get('email')
  public async list(@Query() { currentPage, pageSize, type }, @Req() req) {
    this.logger.log('获取邮件发送列表', req.user.account);
    return await this.emailService.list(currentPage, pageSize, type);
  }

  @Get('sendmail')
  public async sendmail(@Query() { emailTo }, @Req() req) {
    this.logger.log('发送邮件', req.user.account);
    return await this.emailService.sendmail(emailTo);
  }
}
