import { PaymentTypes } from '@prisma/client';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(12.0)
  rate: number;

  @IsEnum(PaymentTypes)
  paymentType: PaymentTypes;

  userId: number;
}
