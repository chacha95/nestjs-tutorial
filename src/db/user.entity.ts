import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { PULID } from '../common/pulid';
import { PostEntity } from './post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  id: string = PULID.generate('us');

  @Column({ name: 'first_name', type: 'varchar' })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar' })
  last_name: string;

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  posts: PostEntity[];
}
