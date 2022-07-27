import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  id?: string;

  // @IsNotEmpty({ message: 'The user login cannot be empty' })
  // @IsString({ message: 'The user login must be a string' })
  // login: string;

  @IsString({ message: 'The user password must be a string' })
  oldPassword: string;

  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  newPassword: string;
}
