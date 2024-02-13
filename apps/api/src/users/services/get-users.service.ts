import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { Pagination } from '@ocmi/api/types';
import { defaultPagination } from '@ocmi/api/constants';

@Injectable()
export class GetUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(pagination: Pagination = defaultPagination) {
    return await this.usersRepository.findAll(pagination);
  }
}
