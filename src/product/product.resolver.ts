import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async getProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  async getProduct(@Args('id') id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
async updateProduct(
  @Args('id') id: number,
  @Args('input') input: UpdateProductInput
) {
  return this.productService.update(id, input);
}

  @Mutation(() => Boolean)
async deleteProduct(@Args('id') id: number) {
  return this.productService.remove(id);
}
  
}
