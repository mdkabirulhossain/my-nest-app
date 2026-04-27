/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private readonly categorySevice: CategoryService){}

    @Get()
    getAllCategories() {
        return this.categorySevice.getCategories();
    }
}
