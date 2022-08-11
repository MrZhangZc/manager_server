import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skill')
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '名字' })
  name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 256,
    comment: '图标',
  })
  icon: string;

  @Column({
      nullable: true,
      type: 'text',
  })
  description: string;
}
