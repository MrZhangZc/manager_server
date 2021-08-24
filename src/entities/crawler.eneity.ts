import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('crawler')
export class Crawler extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '类型' })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 100, comment: '标题' })
  title: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: '链接',
  })
  href: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: '来自于',
  })
  from: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: 'dataid',
  })
  data_id: string;

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  screen_shot: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
