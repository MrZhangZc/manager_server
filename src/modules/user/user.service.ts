import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Role, Chat } from '../../secmas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
  ) {}

  async createUser(body): Promise<User> {
    return await this.userModel.create(body);
  }

  async findRoleByQuery(query): Promise<Role> {
    return await this.roleModel.findOne(query);
  }

  async findList(currentPage, pageSize) {
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const res = await this.userModel
      .find()
      .populate('role')
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .exec();
    return {
      list: res,
      count: res.length,
    };
  }

  async createRole(body) {
    return await this.roleModel.create(body);
  }

  async findRole(query) {
    const { currentPage, pageSize, isPaging } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const res = await this.roleModel
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

  async getChatList(query) {
    const res = await this.chatModel.find().sort({ createdAt: 1 }).exec();
    return res;
  }

  async deleteRole(id) {
    await this.roleModel.deleteOne({ _id: id });
  }
}
