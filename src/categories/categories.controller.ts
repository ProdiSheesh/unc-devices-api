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
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dtos/create-category.dto';
import UpdateCategoryDto from './dtos/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body.name);
  }

  @Get('/')
  findCategories() {
    return this.categoriesService.find();
  }

  @Get('/:id')
  findCategory(@Param('id') id: string) {
    return this.categoriesService.findById(parseInt(id));
  }

  @Patch('/:id')
  updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.update(parseInt(id), body.name);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesService.remove(parseInt(id));
  }
}
