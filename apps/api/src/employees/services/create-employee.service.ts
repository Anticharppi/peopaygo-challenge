import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeesRepository } from '../employees.repository';

@Injectable()
export class CreateEmployeeService {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  async execute(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeesRepository.create(createEmployeeDto);
    return employee;
  }
}
