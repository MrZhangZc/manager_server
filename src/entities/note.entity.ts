import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('note')
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 45,
    comment: 'note/remind',
  })
  type: string;

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
    nullable: false,
    type: 'boolean',
    comment: '已提醒',
    default: false,
  })
  remind_out: boolean;

  @Column({
    nullable: false,
    type: 'boolean',
    comment: '是否完成',
    default: false,
  })
  finish: boolean;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 45,
    comment: '添加人',
  })
  author: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 45,
    comment: '提醒人',
  })
  remind_to: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 45,
    comment: 'note类型',
  })
  note_type: string;

  @Column({
    nullable: true,
    type: 'timestamptz',
    comment: '提醒时间',
  })
  remind_time: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
