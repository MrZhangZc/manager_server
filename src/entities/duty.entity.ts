import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('duty')
export class Duty extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int', comment: '年' })
  year: number;

  @Column({ nullable: false, type: 'int', comment: '月' })
  month: number;

  @Column({ nullable: false, type: 'int', comment: '日' })
  day: number;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '日期' })
  date: string;

  @Column({ nullable: false, type: 'varchar', length: 45, comment: '周几' })
  week: string;

  @Column({ nullable: true, type: 'text', comment: '备注' })
  remark: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 45,
    comment: '值日用户id',
  })
  duty_user_id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 45,
    comment: '值日用户',
  })
  duty_user: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 45,
    comment: '检查人id',
  })
  check_user_id: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 45,
    comment: '检查人',
  })
  check_user: string;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理客厅',
  })
  duty_room: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理厨房',
  })
  duty_kitchen: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理卫生间',
  })
  duty_toilet: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理洗手间',
  })
  duty_washing: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理阳台',
  })
  duty_balcony: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否做饭洗碗帮厨',
  })
  duty_cook: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理客厅是否通过',
  })
  check_duty_room: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理厨房是否通过',
  })
  check_duty_kitchen: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理卫生间是否通过',
  })
  check_duty_toilet: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理洗手间是否通过',
  })
  check_duty_washing: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理阳台是否通过',
  })
  check_duty_balcony: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '做饭洗碗帮厨是否通过',
  })
  check_duty_cook: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理客厅',
  })
  duty_room_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理厨房',
  })
  duty_kitchen_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理卫生间',
  })
  duty_toilet_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理洗手间',
  })
  duty_washing_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否清理阳台',
  })
  duty_balcony_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否做饭洗碗帮厨',
  })
  duty_cook_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理客厅是否通过',
  })
  check_duty_room_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理厨房是否通过',
  })
  check_duty_kitchen_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理卫生间是否通过',
  })
  check_duty_toilet_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理洗手间是否通过',
  })
  check_duty_washing_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '清理阳台是否通过',
  })
  check_duty_balcony_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '做饭洗碗帮厨是否通过',
  })
  check_duty_cook_lock: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否需要加罚款',
  })
  is_penalty: boolean;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
    comment: '是否已经交罚款',
  })
  is_penaltyd: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
