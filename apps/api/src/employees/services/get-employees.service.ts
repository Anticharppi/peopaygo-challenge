import { Injectable } from '@nestjs/common';
import { EmployeesRepository } from '../employees.repository';
import { QueryParams } from '@ocmi/api/types';

@Injectable()
export class GetEmployeesService {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  async execute(query: QueryParams) {
    const pagination = {
      offset: query.offset,
      limit: query.limit,
    };

    console.log(query);

    const employees = query.name
      ? await this.employeesRepository.findAllByName(pagination, query.name)
      : await this.employeesRepository.findAll(pagination);

    const count = query.name
      ? employees.length
      : await this.employeesRepository.count();

    return {
      employees,
      pagination: {
        ...pagination,
        count,
      },
    };
  }
}
