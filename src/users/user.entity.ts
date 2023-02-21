import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PostEntity } from '../posts/post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar' })
  last_name: string;

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  posts: PostEntity[];
}
