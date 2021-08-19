import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resource')
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '资源类型' })
  type: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 200,
    comment: '资源路径',
  })
  path: string;

  @Column({ nullable: true, type: 'varchar', length: 200, comment: '资源描述' })
  desc: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
