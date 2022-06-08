import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}
  
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    await category.save();
    return { category }
  }

  async findAll() {
    const categories = await this.categoryModel.find();
    return { categories }
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(`the category id ${id} was not found`)
    }

    return { category }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { category } = await this.findOne(id);

    if (updateCategoryDto.category_name) {
      category.category_name = updateCategoryDto.category_name
    }

    await category.save()
    return { category }
  }

  async remove(id: string) {
    const { category } = await this.findOne(id);
    await category.remove();
    return {message: `Category #${id} successfully deleted`}
  }
}
