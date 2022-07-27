import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id?: string;

  @IsNotEmpty({ message: 'The user login cannot be empty' })
  @IsString({ message: 'The user login must be a string' })
  login: string;

  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  password: string;
}
