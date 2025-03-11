import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }
  

  async create(input: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(input);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    await this.productRepository.delete(id);
    return true;
  }
  

  async update(id: number, input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    Object.assign(product, input);
    return this.productRepository.save(product);
  }
  
}
