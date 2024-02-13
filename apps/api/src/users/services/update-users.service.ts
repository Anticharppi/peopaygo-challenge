import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto) {
    await this.validateEmailAvailability(updateUserDto, id);
    return await this.usersRepository.update(id, updateUserDto);
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
