import { PaymentTypes, TimesheetStatus } from '@prisma/client';
import {
  Allow,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateTimesheetDto {
  @IsInt()
  grossWage: number;

  @IsString()
  @Allow(null)
  notes: string;

  @IsInt()
  @Allow(null)
  hours: number;

  @IsNumber()
  @Min(12.0)
  rate: number;

  @IsEnum(PaymentTypes)
  paymentType: PaymentTypes;

  @IsDateString()
  from: Date;

  @IsDateString()
  to: Date;

  @IsInt()
  employeeId: number;

  userId: number;
  status: TimesheetStatus;
}
