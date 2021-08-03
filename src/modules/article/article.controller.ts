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
import { ArticleService } from './article.service';
import * as slug from 'slug';
import * as pinyin from 'pinyin';

import { Role, User } from '../../secmas';
import { AuthGuard } from '@nestjs/passport';

@Controller('/article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService, // private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async articleList(@Query() query) {
    const res = await this.articleService.findList(query);
    return res;
  }

  @Get('category')
  async category(@Query() query) {
    return await this.articleService.findCategory(query);
  }

  @Get('categorylist')
  async categorylist(@Query() query) {
    return await this.articleService.findCategoryList(query);
  }

  @Get('/:id')
  async article(@Param() { id }) {
    let res: any = await this.articleService.findArticle(id);
    res = res.toObject();
    res.category = res.category.name;
    return res;
  }

  @Post('category')
  async addCategory(@Body() body) {
    return await this.articleService.addCategory(body);
  }

  @Put('category/:id')
  async updateCategory(@Body() body, @Param() { id }) {
    return await this.articleService.updateCategory(id, body);
  }

  @Delete('category/:id')
  async deleteCategory(@Param() { id }) {
    return await this.articleService.deleteCategory(id);
  }

  @Post()
  async createArticle(@Body() body, @Req() req) {
    const title = body.title.trim();
    const abbreviation = body.abbreviation.trim();
    const tags = body.tags.split(' ');
    const py = pinyin(title, {
      style: pinyin.STYLE_NORMAL,
      heteronym: false,
    })
    .map(function (item) {
      return item[0];
    })
    .join(' ');
    const userinfo = await this.articleService.findUser({account:req.user.account});
    const category = await this.articleService.findOneCategory(body.category);
    const article = {
      title,
      abbreviation,
      content: body.content,
      slug: slug(py),
      tags,
      imgurl: body.imgurl,
      category: category._id,
      author: userinfo._id,
      publishd: true
    };
    return await this.articleService.createArticle(article);
  }

  @Put('edit/:id')
  async updateArticle(@Body() body, @Param() { id }, @Req() req) {
    const title = body.title.trim();
    const abbreviation = body.abbreviation.trim();
    const tags = body.tags.split(' ');
    const py = pinyin(title, {
      style: pinyin.STYLE_NORMAL,
      heteronym: false,
    })
    .map(function (item) {
      return item[0];
    })
    .join(' ');
    const userinfo = await this.articleService.findUser({account:req.user.account});
    const category = await this.articleService.findOneCategory(body.category);
    const article = {
      title,
      abbreviation,
      content: body.content,
      slug: slug(py),
      tags,
      imgurl: body.imgurl,
      category: category._id,
      author: userinfo._id,
      publishd: true
    };
    return await this.articleService.updateArticle(id, article);
  }

  @Delete('role/:id')
  async deleteRole(@Param() { id }) {
    await this.articleService.deleteRole(id);
    return 'success';
  }
}
