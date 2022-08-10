import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('hero')
export class Hero extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '名字' })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '技能名字' })
  skill_name: string;

  @Column({
    nullable: false,
    type: 'text',
    comment: '技能描述',
  })
  skill_description: string;

  @Column({ nullable: false, type: 'varchar', length: 256, comment: '英雄图标' })
  icon: string;

  @Column({ nullable: false, type: 'varchar', length: 256, comment: '技能图标' })
  skill_icon: string;
}
