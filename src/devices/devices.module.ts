import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { Device } from './entities/device.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device]),
    CategoriesModule,
    JwtModule,
    UsersModule,
  ],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
