import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Role } from '../../secmas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAccessService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async createUser(body) {
    return await this.userModel.create(body);
  }

  async createRole(body) {
    const role = new this.roleModel(body);
    return role.save();
  }

  async findUser(query) {
    return await this.userModel.findOne(query).populate('role');
  }

  async getToken(body) {
    return this.jwtService.sign(body);
  }
}
