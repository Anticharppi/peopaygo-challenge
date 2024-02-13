import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';
import {
  CreateEmployeeService,
  GetEmployeesService,
  UpdateEmployeeService,
} from './services';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [EmployeesController],
  providers: [
    CreateEmployeeService,
    UpdateEmployeeService,
    GetEmployeesService,
    EmployeesRepository,
  ],
  imports: [PrismaModule],
  exports: [EmployeesRepository],
})
export class EmployeesModule {}
