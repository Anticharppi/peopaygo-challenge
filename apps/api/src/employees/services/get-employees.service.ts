import { Injectable } from '@nestjs/common';
import { EmployeesRepository } from '../employees.repository';
import { Pagination } from '@ocmi/api/types';

@Injectable()
export class GetEmployeesService {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  async execute(pagination: Pagination) {
    const employees = await this.employeesRepository.findAll(pagination);
    return employees;
  }
}
