import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    if (req.user.admin === 1) {
      return this.categoriesService.create(createCategoryDto);
    }else {
      throw new UnauthorizedException('You cant do this');
    }
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    if (req.user.admin === 1) {
      return this.categoriesService.update(id, updateCategoryDto);
    }else {
      throw new UnauthorizedException('You cant do this');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.admin === 1) {
      return this.categoriesService.remove(id);
    }else {
      throw new UnauthorizedException('You cant do this');
    }
  }
}
