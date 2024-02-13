import { PaymentTypes, TimesheetStatus } from '@prisma/client';
import {
  Allow,
  IsDecimal,
  IsEnum,
  IsInt,
  IsString,
  Min,
} from 'class-validator';

export class CreateTimesheetDto {
  @IsDecimal()
  @Min(12.0)
  rate: number;

  @IsDecimal()
  grossWage: number;

  @IsEnum(PaymentTypes)
  paymentType: PaymentTypes;

  @IsString()
  @Allow(null)
  notes: string;

  @IsInt()
  @Allow(null)
  hours: number;

  @IsInt()
  employeeId: number;

  userId: number;
  status: TimesheetStatus;
}
