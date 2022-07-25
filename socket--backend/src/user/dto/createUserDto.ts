import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  admin: boolean;

  @ApiProperty()
  document: string;
}
