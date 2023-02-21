import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { PULID } from '../common/pulid';
import { UserEntity } from './user.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  id: string = PULID.generate('po');

  @Column({ name: 'user_id', type: 'number', nullable: false })
  user_id: string;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
