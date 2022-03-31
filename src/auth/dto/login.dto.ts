import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiPropertyOptional({ description: '账户', example: 'nfeng' })
  @IsNotEmpty({ message: '请填写账户' })
  username: string;

  @ApiPropertyOptional({ description: '密码', example: '123' })
  @IsNotEmpty({ message: '请填写密码' })
  password: string;
}
