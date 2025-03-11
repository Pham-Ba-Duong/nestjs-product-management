import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(input);
    return this.categoryRepository.save(category);
  }

  async update(id: number, input: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    Object.assign(category, input);
    return this.categoryRepository.save(category);
  }
  
  async remove(id: number): Promise<boolean> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.delete(id);
    return true;
  }
  
}
