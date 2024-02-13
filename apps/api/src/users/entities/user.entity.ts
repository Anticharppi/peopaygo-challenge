import { User as _User } from '@prisma/client';

export class User implements _User {
  id: number;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}
