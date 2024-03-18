import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { DevicesModule } from './devices/devices.module';
import { IsUniqueConstraint } from './lib/validations/is-unique.validation';
import { Category } from './categories/entities/category.entity';
import { Device } from './devices/entities/device.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          url: config.get('URL'),
          entities: [Device, Category, User],
          synchronize: true,
          ssl: true,
        };
      },
    }),
    CategoriesModule,
    DevicesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
