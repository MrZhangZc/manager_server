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

import { AuthGuard } from '@nestjs/passport';
import { fetchNbaNews, story, fetchNews } from '../../util';

@UseGuards(AuthGuard('jwt'))
@Controller('/api')
export class ApiController {
  @Get('story')
  async category(@Query() { value, type, word, page }) {
    let res;
    if (value === 'story') {
      res = await story(type, word, page);
    }
    if (value === 'news') {
      if (type === 'eSport')
        res = await fetchNews('/esports/index', word, page);
      if (type === 'video') res = await fetchNews('/film/index', word, page);
      if (type === 'it') res = await fetchNews('/it/index', word, page);
      if (type === 'nba') res = await fetchNews('/nba/index', word, page);
      if (type === 'topnews')
        res = await fetchNews('/topnews/index', word, page);
    }
    return res;
  }
}
