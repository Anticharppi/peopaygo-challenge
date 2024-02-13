import { Employee as _Employee } from '@prisma/client';

export class Employee implements _Employee {
  id: number;
  name: string;
  userId: number;
}
