import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import UpdateCategoryDto from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  create(name: string) {
    const category = this.repo.create({
      name,
    });

    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const category = await this.repo.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    return this.repo.remove(category);
  }
}
