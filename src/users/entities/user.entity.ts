import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'user id' })
  id: number;

  @Column()
  @ApiProperty({ description: '이름' })
  firstName: string;

  @Column()
  @ApiProperty({ description: '성' })
  lastName: string;

  static of(params: Partial<UserEntity>): UserEntity {
    const user = new UserEntity();
    Object.assign(user, params);

    return user;
  }
}
