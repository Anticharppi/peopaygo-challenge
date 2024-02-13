import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Nulleable, Pagination } from '../types';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string): Promise<Nulleable<User>> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number): Promise<Nulleable<User>> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  findAll(pagination: Pagination): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: pagination.offset,
      take: pagination.limit,
    });
  }
}
