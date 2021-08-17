import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site_collection')
export class SiteCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '网站类型' })
  type: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 200,
    comment: '网站地址',
  })
  path: string;

  @Column({
    nullable: true,
    type: 'text',
    comment: '描述',
  })
  desc: string;

  @Column({
    nullable: true,
    type: 'text',
    comment: '附加',
  })
  addition: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 200,
    comment: '图标',
  })
  icon: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
