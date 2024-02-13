import { Injectable } from '@nestjs/common';
import { EmployeesRepository } from '../employees.repository';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class UpdateEmployeeService {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  async execute(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesRepository.update(
      id,
      updateEmployeeDto,
    );
    return employee;
  }
}
