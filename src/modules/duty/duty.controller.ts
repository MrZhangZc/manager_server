import { DutyService } from './duty.service';
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
@Controller('/clockin/duty')
export class DutyController {
  constructor(private readonly dutyService: DutyService) {}

  @Post()
  public async create(@Body() body) {
    console.log(body);
    return await this.dutyService.create(body);
  }

  @Get()
  public async getList(
    @Query()
    { year = new Date().getFullYear(), month = new Date().getMonth() + 1 },
  ) {
    return await this.dutyService.findMonthList(year, month);
  }

  @Patch('status/:id')
  public async updateStatus(@Param() { id }, @Body() { type, result }) {
    return await this.dutyService.updateById(id, {
      [type]: result,
      [`${type}_lock`]: true,
    });
  }

  @Put('edit/:id')
  public async update(@Param() { id }, @Body() body) {
    return await this.dutyService.updateById(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }) {
    return await this.dutyService.deleteById(id);
  }
}
