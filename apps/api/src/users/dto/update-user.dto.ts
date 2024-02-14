import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['isAdmin', 'password']),
) {
  @IsOptional()
  @IsStrongPassword()
  newPassword: string;

  @IsOptional()
  currentPassword: string;

  password: string;
}
