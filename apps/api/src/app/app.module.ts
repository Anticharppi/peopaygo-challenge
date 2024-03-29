import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { EmployeesModule } from '../employees/employees.module';
import { TimesheetsModule } from '../timesheets/timesheets.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    EmployeesModule,
    TimesheetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
