import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '이름' })
  readonly first_name: string;

  @IsString()
  @ApiProperty({ description: '성' })
  readonly last_name: string;
}
