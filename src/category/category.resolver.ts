import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { CategoryPublic } from "./dto/category";
import { CategoryCreateInput } from "./dto/category-create.input";

@Resolver(of => CategoryPublic)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) { }

    @Query(returns => [CategoryPublic], { name: 'getAllCategories' })
    async getAllCategories(): Promise<CategoryPublic[]> {
        return await this.categoryService.findAll();
    }


    @Mutation(returns => CategoryPublic, { name: 'createCategory' })
    async createCategory(
        @Args('input') input: CategoryCreateInput
    ): Promise<CategoryPublic> {
        const categoryEntity = new Category()
        categoryEntity.name = input.name
        categoryEntity.slug = input.slug
        return await this.categoryService.create(categoryEntity);
    }
}