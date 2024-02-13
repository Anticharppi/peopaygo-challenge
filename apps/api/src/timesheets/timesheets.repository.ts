import { Injectable } from '@nestjs/common';
import { Timesheet } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Pagination } from '../types';

@Injectable()
export class TimesheetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Timesheet, 'id'>) {
    return await this.prisma.timesheet.create({ data });
  }

  async update(id: number, data: Partial<Timesheet>) {
    return await this.prisma.timesheet.update({
      where: { id },
      data,
    });
  }

  async findAll(pagination: Pagination) {
    return await this.prisma.timesheet.findMany({
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  async findAllByUserId(userId: number, pagination: Pagination) {
    return await this.prisma.timesheet.findMany({
      where: {
        userId,
      },
      include: {
        employee: true,
      },
      skip: pagination.offset,
      take: pagination.limit,
    });
  }
}
