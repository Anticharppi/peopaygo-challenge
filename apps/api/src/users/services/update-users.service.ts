import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hashSync } from 'bcrypt';
import { PASSWORD_HASH_SALT } from '@ocmi/api/constants';

@Injectable()
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto) {
    await this.validateEmailAvailability(updateUserDto, id);
    if (updateUserDto.password) {
      updateUserDto.password = hashSync(
        updateUserDto.password,
        PASSWORD_HASH_SALT,
      );
    }
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
