import { Module } from '@nestjs/common';
import { TimesheetsController } from './timesheets.controller';
import { EmployeesModule } from '../employees/employees.module';
import { CreateTimesheetService } from './services/create-timesheet.service';
import { TimesheetsRepository } from './timesheets.repository';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [TimesheetsController],
  providers: [CreateTimesheetService, TimesheetsRepository],
  imports: [EmployeesModule, PrismaModule],
})
export class TimesheetsModule {}
