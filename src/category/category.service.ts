import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CategoryPublic } from "./dto/category";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async findAll(): Promise<CategoryPublic[]> {
        return this.categoryRepository.find();
    }

    async create(input: Category): Promise<Category> {
        return this.categoryRepository.save(input);
    }
}