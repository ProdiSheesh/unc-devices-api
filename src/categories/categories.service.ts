import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  create(name: string) {
    const category = this.repo.create({
      name,
    });

    return this.repo.save(category);
  }

  find() {
    return this.repo.find();
  }

  async findById(id: number) {
    const category = await this.repo.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  async update(id: number, name: string) {
    const category = await this.findById(id);

    category.name = name;

    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.findById(id);

    return this.repo.remove(category);
  }
}
