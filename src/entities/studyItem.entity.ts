import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('study_item')
export class StudyItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int', comment: '类型' })
  cate_type: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '标题' })
  cate_title: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
