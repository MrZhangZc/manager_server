import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { User, Role } from '../../secmas';

@Injectable()
export class ClockinService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  public async getClockinUser() {
    return await this.userModel.find().populate('role');
  }

  // public async create(body) {
  //   await this.UserRep.save(body);
  // }

  // public async find(start, length, id, name) {
  //   const where = {};
  //   if (id) Object.assign(where, { id });
  //   if (name) Object.assign(where, { name });

  //   const list = await this.UserRep.findAndCount({
  //     where,
  //     order: {
  //       id: 'DESC',
  //     },
  //     skip: start,
  //     take: length,
  //   });
  //   return {
  //     list: list[0],
  //     total: list[1],
  //   };
  // }

  // public async updateById(id, body) {
  //   return await this.UserRep.update({ id }, body);
  // }

  // public async deleteById(id) {
  //   return this.UserRep.delete({ id });
  // }
}
