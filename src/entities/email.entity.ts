import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('email')
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '发送给谁' })
  to: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 200,
    comment: '脑筋急转弯内容',
  })
  quest: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 200,
    comment: '脑筋急转弯答案',
  })
  questres: string;

  @Column({
    nullable: false,
    type: 'boolean',
    comment: '结果是否成功',
  })
  result: boolean;

  @Column({
    nullable: true,
    type: 'json',
    comment: '响应',
  })
  response: any;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
