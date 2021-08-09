import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, Comment, Category, User } from '../../secmas';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<Article>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createArticle(body) {
    return await this.articleModel.create(body);
  }

  async findArticle(id) {
    return await this.articleModel.findById(id).populate('category');
  }

  async addCategory(body) {
    return await this.categoryModel.create(body);
  }

  async deleteCategory(id) {
    return await this.categoryModel.findByIdAndRemove(id);
  }

  async updateCategory(id, body) {
    return await this.categoryModel.findByIdAndUpdate(id, body);
  }

  async updateArticle(id, body) {
    return await this.articleModel.findByIdAndUpdate(id, body);
  }

  async findList(query) {
    const { currentPage, pageSize, isPaging } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const res = await this.articleModel
      .find()
      .populate('author')
      .populate('category')
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ 'meta.createdAt': -1 })
      .exec();
    return {
      list: res,
      count: res.length,
    };
  }

  async findCategoryList(query) {
    const { currentPage, pageSize, isPaging, search } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    let res = [];
    if (search) {
      const regexp = new RegExp(search, 'i');
      res = await this.categoryModel
        .find({ name: regexp })
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ 'meta.createdAt': -1 })
        .exec();
    } else {
      res = await this.categoryModel
        .find()
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ 'meta.createdAt': -1 })
        .exec();
    }

    return {
      list: res,
      count: res.length,
    };
  }

  async findCategory(query) {
    const regexp = new RegExp(query.name, 'i');
    return await this.categoryModel.find({ name: regexp });
  }

  async createRole(body) {
    return await this.articleModel.create(body);
  }

  async findUser(query) {
    return await this.userModel.findOne(query);
  }

  async findOneCategory(name) {
    return await this.categoryModel.findOne({ name });
  }

  async findRole(query) {
    const { currentPage, pageSize, isPaging } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const res = await this.articleModel
      .find()
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .exec();
    return {
      list: res,
      count: res.length,
    };
  }

  async deleteRole(id) {
    await this.articleModel.deleteOne({ _id: id });
  }
}
