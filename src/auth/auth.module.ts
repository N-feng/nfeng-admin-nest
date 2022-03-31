import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
          signOptions: { expiresIn: '2 days' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
