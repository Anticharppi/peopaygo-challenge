import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UpdateUserService, GetUsersService } from './services';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [UsersController],
  providers: [UpdateUserService, GetUsersService, UsersRepository],
  imports: [PrismaModule],
  exports: [UsersRepository],
})
export class UsersModule {}
