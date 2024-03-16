import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), CategoriesModule],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
