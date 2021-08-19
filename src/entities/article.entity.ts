import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article')
export class Article extends BaseEntity {
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
    type: 'text',
    comment: '内容',
  })
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
