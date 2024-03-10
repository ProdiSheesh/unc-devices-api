import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import CreateDeviceDto from './dtos/create-device.dto';
import UpdateDeviceDto from './dtos/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Post('/')
  createDevice(@Body() body: CreateDeviceDto) {
    return this.devicesService.create(body);
  }

  @Get('/')
  findDevices() {
    return this.devicesService.find();
  }

  @Get('/:id')
  findDevice(@Param('id') id: string) {
    return this.devicesService.findById(parseInt(id));
  }

  @Patch('/:id')
  updateDevice(@Param('id') id: string, @Body() body: UpdateDeviceDto) {
    return this.devicesService.update(parseInt(id), body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  removeDevice(@Param('id') id: string) {
    return this.devicesService.remove(parseInt(id));
  }
}
