import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import {
  UpdateUserService,
  GetUsersService,
  CreateUserService,
} from './services';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserService,
    UpdateUserService,
    GetUsersService,
    UsersRepository,
  ],
  imports: [PrismaModule],
})
export class UsersModule {}
