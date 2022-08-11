import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
  
@Entity('gift_djjl')
export class GiftDjjl extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 45, comment: '标签' })
    tag: string;
  
    @Column({ nullable: false, type: 'varchar', length: 100, comment: '标题' })
    title: string;
  
    @Column({
      nullable: true,
      type: 'text',
      comment: '链接',
    })
    href: string;
    
    @Column({
      nullable: true,
      type: 'varchar',
      length: 256,
      comment: '图标',
    })
    icon: string;
  
    @CreateDateColumn({ type: 'timestamptz', comment: '礼包结束时间' })
    end_time: Date;
  
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
  
    @Column({ nullable: false, type: 'int2', default: 0,comment: '顺序' })
    rank_num: number;
  
    @Column({ nullable: false, type: 'int2', default: 1, comment: '状态' })
    state: number;
}
  