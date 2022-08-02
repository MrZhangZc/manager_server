import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { story, fetchNews } from '../../util';
import { SystemLogService } from '../system_log/system_log.service';

@UseGuards(AuthGuard('jwt'))
@Controller('/api')
export class ApiController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Get('story')
  async category(@Query() { value, type, word, page }, @Req() req) {
    let res;
    if (value === 'story') {
      res = await story(type, word, page);
    }
    if (value === 'news') {
      if (!type) res = await fetchNews('/nba/index', word, page);
      if (type === 'eSport')
        res = await fetchNews('/esports/index', word, page);
      if (type === 'video') res = await fetchNews('/film/index', word, page);
      if (type === 'it') res = await fetchNews('/it/index', word, page);
      if (type === 'nba') res = await fetchNews('/nba/index', word, page);
      if (type === 'topnews')
        res = await fetchNews('/topnews/index', word, page);
    }
    this.systemLogService.create({
      operator: req.user.account,
      operate_api: 'GET{api/story}',
      third_api: 'GET{xxxx/index}',
      type: '第三方接口get访问',
      parameter: { value, type, word, page },
      addition: `获取${value === 'story' ? '故事' : '新闻'}`,
    });
    return res;
  }
}
