import { Config } from './../config/config';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, Query, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller(`${Config.adminPath}/users`)
@ApiTags('用户')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('findAll')
  @ApiOperation({ summary: '用户列表' })
  async findAll() {
    const result = await this.usersService.findAll();
    return { code: 200, data: { list: result } };
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询用户' })
  async findOne(@Query('username') username: string) {
    const { password, ...user } = await this.usersService.findOne(username);
    return { code: 200, data: user };
  }

  @Put('update:id')
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    await this.usersService.update(id, createUserDto)
    return { code: 200, data: {} }
  }

  @Get('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    await this.usersService.delete(id)
    return { code: 200, data: {} }
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    const newParam = { ...createUserDto, status: true };
    await this.usersService.create(newParam);
    return { code: 200, data: {} };
  }

  @Post('/many')
  @ApiOperation({ summary: '批量创建用户' })
  async createMany(@Body() users) {
    const newUsers = users.map((user) => ({ ...user, status: true }));
    await this.usersService.createMany(newUsers);
    return { code: 200, data: {} };
  }
}
