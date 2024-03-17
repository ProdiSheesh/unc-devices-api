import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get('JWT_EXPIRES_IN'),
          },
        };
      },
    }),
    JwtModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
