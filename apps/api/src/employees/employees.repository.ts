import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Pagination } from '../types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Employee, 'id'>) {
    return await this.prisma.employee.create({
      data: {
        name: data.name,
        paymentType: data.paymentType,
        rate: data.rate,
        createdBy: { connect: { id: data.userId } },
      },
    });
  }

  async count() {
    return await this.prisma.employee.count();
  }

  async findAll(pagination: Pagination): Promise<Employee[]> {
    return await this.prisma.employee.findMany({
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  async findAllByName(pagination: Pagination, name: string) {
    return await this.prisma.employee.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  async findOne(id: number) {
    return await this.prisma.employee.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.EmployeeUpdateInput) {
    return await this.prisma.employee.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.employee.delete({ where: { id } });
  }
}
