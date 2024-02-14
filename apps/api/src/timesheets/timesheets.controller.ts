import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { CreateTimesheetService } from './services/create-timesheet.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('timesheets')
export class TimesheetsController {
  constructor(
    private readonly createTimesheetService: CreateTimesheetService,
  ) {}

  @Post()
  create(@Body() createTimesheetDto: CreateTimesheetDto, @Req() request) {
    createTimesheetDto.userId = request.user.sub;
    return this.createTimesheetService.execute(createTimesheetDto);
  }
}
