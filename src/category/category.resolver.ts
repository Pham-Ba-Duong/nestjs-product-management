import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async getCategories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Mutation(() => Category)
async updateCategory(
  @Args('id') id: number,
  @Args('input') input: UpdateCategoryInput
) {
  return this.categoryService.update(id, input);
}

@Mutation(() => Boolean)
async deleteCategory(@Args('id') id: number) {
  return this.categoryService.remove(id);
}

}
