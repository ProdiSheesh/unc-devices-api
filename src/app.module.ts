import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { DevicesModule } from './devices/devices.module';
import Category from './categories/category.entity';
import Device from './devices/device.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Category, Device],
      synchronize: true,
    }),
    CategoriesModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
