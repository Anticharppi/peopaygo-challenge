import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  userId: number;
}
