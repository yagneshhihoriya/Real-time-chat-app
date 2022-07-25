import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserRequestDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  admin: boolean;

  @ApiProperty()
  @IsString()
  document: string;
}
