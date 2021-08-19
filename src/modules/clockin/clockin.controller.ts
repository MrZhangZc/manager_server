import { ClockinService } from './clockin.service';
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
import * as R from 'ramda';
// @UseGuards(AuthGuard('jwt'))
@Controller('/clockin')
export class ClockinController {
  constructor(private readonly clockinService: ClockinService) {}

  @Get('user')
  public async getClockinUser() {
    const users: any = await this.clockinService.getClockinUser();
    return R.compose(
      R.append({ account: '一起', id: '123456' }),
      R.map(R.pick(['account', 'id'])),
      R.filter(
        (item) =>
          item.role.access === 'clockin' ||
          item.role.access === 'clockin_admin',
      ),
    )(users);
  }

  // @Post()
  // public async create(@Body() body) {
  //   return await this.clockinService.create(body);
  // }

  // @Get()
  // public async getList(@Query() { start, length, id, name }) {
  //   return await this.clockinService.find(start, length, id, name);
  // }

  // @Patch(':id')
  // public async updateStatus(@Param() { id }, @Body() body) {
  //   return await this.clockinService.updateById(id, body);
  // }

  // @Put('edit/:id')
  // public async update(@Param() { id }, @Body() body) {
  //   return await this.clockinService.updateById(id, body);
  // }

  // @Delete(':id')
  // public async delete(@Param() { id }) {
  //   return await this.clockinService.deleteById(id);
  // }
}
