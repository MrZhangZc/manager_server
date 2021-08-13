import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Visitor } from '../../secmas';

@Injectable()
export class VisitorUserService {
  constructor(
    @InjectModel(Visitor.name)
    private readonly visitorModel: Model<Visitor>,
  ) {}

  async findList(query) {
    const { currentPage = 1, pageSize = 20 } = query;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    const where = {};
    if (query.unknownShow === 'false')
      Object.assign(where, { city: { $ne: '未知' } });
    if (query.timeRange.length) {
      const [start, end] = query.timeRange;
      Object.assign(where, { 'meta.createdAt': { $gte: start, $lt: end } });
    }
    const res = await this.visitorModel
      .find(where)
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ 'meta.createdAt': -1 })
      .exec();
    const count = await this.visitorModel.countDocuments(where);
    return {
      list: res,
      count: count,
    };
  }

  async findGroupList(query) {
    const match = {};
    if (query.timeRange.length) {
      const [start, end] = query.timeRange;
      Object.assign(match, {
        'meta.createdAt': { $gte: new Date(start), $lt: new Date(end) },
      });
    }
    let aggregateOpts = [];
    const type = query?.type || 'day';
    if (type === 'day') {
      aggregateOpts = [
        {
          $project: {
            day: { $substr: [{ $add: ['$meta.createdAt', 28800000] }, 0, 10] }, //时区数据校准，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分组
          },
        },
        {
          $group: {
            _id: '$day',
            content_sum: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ];
    } else {
      Object.assign(match, {
        city: { $ne: '未知' },
      });
      aggregateOpts = [
        {
          $group: {
            _id: '$' + type,
            content_sum: { $sum: 1 },
          },
        },
      ];
    }
    const res = await this.visitorModel.aggregate([
      { $match: match },
      ...aggregateOpts,
    ]);
    const result = res.reduce(
      (prev, cur) => {
        prev.data.push(cur.content_sum);
        prev.title.push(cur._id);
        return prev;
      },
      {
        data: [],
        title: [],
        lineName: '博客访问情况',
      },
    );
    return result;
  }
}
