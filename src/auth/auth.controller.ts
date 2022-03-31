import { UsersService } from './../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Config } from './../config/config';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller(`${Config.adminPath}/auth`)
@ApiTags('用户')
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.create({ ...registerDto, status: true });
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginDto: LoginDto, @Req() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: '获取个人信息' })
  @ApiBearerAuth()
  async getProfile(@Req() req) {
    return req.user;
  }
}
