import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from '../../secmas';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name)
    private readonly brticleModel: Model<Banner>,
  ) {}

  public async create(body) {
    return await this.brticleModel.create(body);
  }

  public async find() {
    const list = await this.brticleModel.find({});
    return {
      list: list,
      total: list.length,
    };
  }

  public async updateById(id, body) {
    return await this.brticleModel.findByIdAndUpdate(id, body);
  }

  public async deleteById(id) {
    return this.brticleModel.findByIdAndDelete(id);
  }
}
