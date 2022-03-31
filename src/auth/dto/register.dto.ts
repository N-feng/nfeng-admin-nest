import { IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiPropertyOptional({ description: '账户', example: 'nfeng' })
  @IsNotEmpty({ message: '请填写账户' })
  username: string;

  @ApiPropertyOptional({ description: '密码', example: '123' })
  @IsNotEmpty({ message: '请填写密码' })
  password: string;

  @ApiPropertyOptional({ description: '用户电话', example: '13802727080' })
  @IsString()
  mobile: string;

  @ApiPropertyOptional({ description: '用户邮箱', example: '308561157@qq.com' })
  @IsString()
  email: string;
}
