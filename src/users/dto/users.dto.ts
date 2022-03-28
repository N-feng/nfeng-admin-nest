import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({ description: '用户名称', example: 'walker' })
  @IsString()
  readonly username: string;

  @ApiPropertyOptional({ description: '用户密码', example: 'xiaoer123' })
  @IsString()
  password: string;
}
