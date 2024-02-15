import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  CreateEmployeeService,
  GetEmployeesService,
  UpdateEmployeeService,
} from './services';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly createEmployeeService: CreateEmployeeService,
    private readonly updateEmployeeService: UpdateEmployeeService,
    private readonly getEmployeesService: GetEmployeesService,
  ) {}

  @Post()
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Request() request,
  ) {
    createEmployeeDto.userId = request.user.sub;
    return await this.createEmployeeService.execute(createEmployeeDto);
  }

  @Get()
  findAll(
    @Query('offset', ParseIntPipe) offset: number = 0,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('name') name?: string,
  ) {
    return this.getEmployeesService.execute({ offset, limit, name });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() request,
  ) {
    updateEmployeeDto.userId = request.user.sub;
    return this.updateEmployeeService.execute(id, updateEmployeeDto);
  }
}
