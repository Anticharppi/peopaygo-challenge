import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TimesheetsRepository } from '../timesheets.repository';
import { CreateTimesheetDto } from '../dto/create-timesheet.dto';
import { PaymentTypes, TimesheetStatus } from '@prisma/client';
import { EmployeesRepository } from '@ocmi/api/employees/employees.repository';

@Injectable()
export class CreateTimesheetService {
  constructor(
    private timesheetsRepository: TimesheetsRepository,
    private employeesRepository: EmployeesRepository,
  ) {}

  async execute(createTimesheetDto: CreateTimesheetDto) {
    const employee = await this.employeesRepository.findOne(
      createTimesheetDto.employeeId,
    );

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (employee.paymentType === PaymentTypes.Hourly) {
      if (!createTimesheetDto.hours) {
        throw new ConflictException('Hours are required for hourly employees');
      }
      createTimesheetDto.grossWage = createTimesheetDto.hours * employee.rate;
    } else {
      createTimesheetDto.grossWage = employee.rate;
      createTimesheetDto.hours = null;
    }

    createTimesheetDto.status = TimesheetStatus.Pending;

    return await this.timesheetsRepository.create(createTimesheetDto);
  }
}
