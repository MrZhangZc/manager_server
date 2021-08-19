import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('systemlog')
export class Systemlog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '操作人' })
  operator: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '操作接口' })
  operate_api: string;

  @Column({ nullable: false, type: 'json', comment: '参数' })
  parameter: any;

  @Column({ nullable: true, type: 'varchar', length: 45, comment: '类型' })
  type: string;

  @Column({ nullable: true, type: 'varchar', length: 200, comment: '结果' })
  result: string;

  @Column({ nullable: true, type: 'varchar', length: 200, comment: '附加' })
  addition: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 200,
    comment: '第三方api',
  })
  third_api: string;

  @Column({
    nullable: true,
    type: 'json',
    comment: '第三方返回结果',
  })
  third_res: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
