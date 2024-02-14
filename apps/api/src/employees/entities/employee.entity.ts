import { PaymentTypes, Employee as _Employee } from '@prisma/client';

export class Employee implements _Employee {
  rate: number;
  paymentType: PaymentTypes;
  id: number;
  name: string;
  userId: number;
}
