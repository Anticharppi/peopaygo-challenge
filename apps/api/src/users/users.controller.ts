import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserService,
  GetUsersService,
  UpdateUserService,
} from './services';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly getUsersService: GetUsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.execute(createUserDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return await this.getUsersService.execute({ offset, limit });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(+id, updateUserDto);
  }
}
