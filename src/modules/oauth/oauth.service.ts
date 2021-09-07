import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OauthUser, Role } from '../../secmas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OauthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(OauthUser.name)
    private readonly oauthUserModel: Model<OauthUser>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async createUser(body): Promise<OauthUser> {
    return await this.oauthUserModel.create(body);
  }

  async findRoleByQuery(query): Promise<Role> {
    return await this.roleModel.findOne(query);
  }

  async getUser(query): Promise<OauthUser> {
    return await this.oauthUserModel.findOne(query).populate('role');
  }

  async getToken(body) {
    return this.jwtService.sign(body);
  }

  // async findList(currentPage, pageSize) {
  //   const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
  //   const res = await this.userModel
  //     .find()
  //     .populate('role')
  //     .skip(skip)
  //     .limit(Number(pageSize))
  //     .sort({ createdAt: -1 })
  //     .exec();
  //   return {
  //     list: res,
  //     count: res.length,
  //   };
  // }

  // async createRole(body) {
  //   return await this.roleModel.create(body);
  // }

  // async findRole(query) {
  //   const { currentPage, pageSize, isPaging } = query;
  //   const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
  //   const res = await this.roleModel
  //     .find()
  //     .skip(skip)
  //     .limit(Number(pageSize))
  //     .sort({ createdAt: -1 })
  //     .exec();
  //   return {
  //     list: res,
  //     count: res.length,
  //   };
  // }

  // async deleteRole(id) {
  //   await this.roleModel.deleteOne({ _id: id });
  // }
}
