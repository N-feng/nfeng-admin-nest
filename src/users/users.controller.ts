import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() param) {
    const newParam = { ...param, status: true };
    await this.usersService.create(newParam);
    return true;
  }

  @Post('/many')
  async createMany(@Body() users) {
    const newUsers = users.map((user) => ({ ...user, status: true }));
    await this.usersService.createMany(newUsers);
    return true;
  }
}
