import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { DevicesModule } from './devices/devices.module';
import { IsUniqueConstraint } from './lib/validations/is-unique.validation';
import { Category } from './categories/entities/category.entity';
import { Device } from './devices/entities/device.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entities: [Device, Category],
          synchronize: true,
          ssl: true,
        };
      },
    }),
    CategoriesModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
