import { Injectable } from '@nestjs/common';
import { TimesheetsRepository } from '../timesheets.repository';
import { CreateTimesheetDto } from '../dto/create-timesheet.dto';
import { TimesheetStatus } from '@prisma/client';

@Injectable()
export class CreateTimesheetService {
  constructor(private timesheetsRepository: TimesheetsRepository) {}

  async execute(createTimesheetDto: CreateTimesheetDto) {
    createTimesheetDto.status = TimesheetStatus.Pending;
    return await this.timesheetsRepository.create(createTimesheetDto);
  }
}
