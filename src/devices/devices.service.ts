import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private repo: Repository<Device>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const { name, tagNumber, serialNumber, remarks, categoryId } =
      createDeviceDto;

    const category = await this.categoriesService.findOne(categoryId);

    const device = this.repo.create({
      name,
      tagNumber,
      serialNumber,
      remarks,
      category,
    });

    return this.repo.save(device);
  }

  async findAll(query: string) {
    if (query) {
      return this.repo
        .createQueryBuilder('device')
        .leftJoinAndSelect('device.category', 'category')
        .where('LOWER(device.name) LIKE LOWER(:query)', {
          query: `%${query}%`,
        })
        .orWhere('LOWER(device.tagNumber) LIKE LOWER(:query)', {
          query: `%${query}%`,
        })
        .orWhere('LOWER(device.serialNumber) LIKE LOWER(:query)', {
          query: `%${query}%`,
        })
        .orWhere('LOWER(device.remarks) LIKE LOWER(:query)', {
          query: `%${query}%`,
        })

        .orWhere('LOWER(category.name) LIKE LOWER(:query)', {
          query: `%${query}%`,
        })
        .getMany();
    }

    return this.repo.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const device = await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!device) throw new NotFoundException('Device not found.');

    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const { categoryId, ...updatedData } = updateDeviceDto;

    const device = await this.findOne(id);

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      device.category = category;
    }

    Object.assign(device, updatedData);

    return this.repo.save(device);
  }

  async remove(id: number) {
    const device = await this.findOne(id);

    return this.repo.remove(device);
  }
}
