import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersService, UpdateUserService } from './services';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly updateUserService: UpdateUserService,
    private readonly getUsersService: GetUsersService,
  ) {}

  @Get()
  async findAll(
    @Query('offset', ParseIntPipe) offset: number = 0,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return await this.getUsersService.execute({ offset, limit });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(+id, updateUserDto);
  }
}
