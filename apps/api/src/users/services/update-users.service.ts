import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { compareSync, hashSync } from 'bcrypt';
import { PASSWORD_HASH_SALT } from '@ocmi/api/constants';

@Injectable()
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto) {
    await this.validateEmailAvailability(updateUserDto, id);
    if (updateUserDto.newPassword) {
      if (!updateUserDto.currentPassword) {
        throw new ConflictException(
          'Current password is required to update your password for security reasons.',
        );
      }
      const user = await this.usersRepository.findById(id);
      if (!compareSync(updateUserDto.currentPassword, user.password)) {
        throw new ConflictException('Invalid current password');
      }
      updateUserDto.password = hashSync(
        updateUserDto.newPassword,
        PASSWORD_HASH_SALT,
      );
    }
    delete updateUserDto.newPassword;
    delete updateUserDto.currentPassword;
    const user = await this.usersRepository.update(id, updateUserDto);
    delete user.password;
    return user;
  }

  private async validateEmailAvailability(
    updateUserDto: UpdateUserDto,
    id: number,
  ) {
    if (updateUserDto.email) {
      const user = await this.usersRepository.findByEmail(updateUserDto.email);
      if (user && user.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }
  }
}
