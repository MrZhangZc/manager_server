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
} from '@nestjs/common';
import { EmailService } from './email.service';
import { deleteQiNiuSource } from '../../util';

import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('/task')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('email')
  public async list(@Query() { currentPage, pageSize, type }) {
    return await this.emailService.list(currentPage, pageSize, type);
  }

  @Get('sendmail')
  public async sendmail(@Query() { emailTo }) {
    return await this.emailService.sendmail(emailTo);
  }
}
