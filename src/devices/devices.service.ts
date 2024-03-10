import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Device from './device.entity';
import { Repository } from 'typeorm';
import CreateDeviceDto from './dtos/create-device.dto';
import { CategoriesService } from 'src/categories/categories.service';
import UpdateDeviceDto from './dtos/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private repo: Repository<Device>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const category = await this.categoriesService.findById(
      createDeviceDto.category,
    );

    const device = this.repo.create({
      name: createDeviceDto.name,
      tagNumber: createDeviceDto.tagNumber,
      serialNumber: createDeviceDto.serialNumber,
      remarks: createDeviceDto.remarks,
      category,
    });

    return this.repo.save(device);
  }

  find() {
    return this.repo.find();
  }

  async findById(id: number) {
    const device = await this.repo.findOne({
      where: { id },
    });

    if (!device) throw new NotFoundException('Device not found.');

    return device;
  }

  async update(id: number, updateDeviceDto: Partial<UpdateDeviceDto>) {
    const device = await this.findById(id);

    Object.assign(device, updateDeviceDto);

    return this.repo.save(device);
  }

  async remove(id: number) {
    const device = await this.findById(id);

    return this.repo.remove(device);
  }
}
