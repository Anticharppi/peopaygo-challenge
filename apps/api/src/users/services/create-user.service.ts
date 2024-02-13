import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }
    return await this.usersRepository.create(createUserDto);
  }
}
