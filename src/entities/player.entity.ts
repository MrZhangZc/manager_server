import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('player')
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '名字' })
  name: string;

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  nick_name: string[];

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
    comment: '年限名字',
  })
  year_name: string;

  @Column({ nullable: true, type: 'int2', default: 1, comment: '链接' })
  quality: number;

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  tag: string[];

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  skill: string[];

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  sign_skill: string[];

  @Column({
    nullable: true,
    type: 'text',
    array: true,
  })
  hero: string[];

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '战队' })
  team: string;

  @Column({ nullable: true, type: 'int2', comment: '评分' })
  point: number;

  @Column({ nullable: false, type: 'varchar', length: 256, comment: '照片' })
  photo: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 256,
    comment: '背景照片',
  })
  bg_photo: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
