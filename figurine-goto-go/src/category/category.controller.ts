import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { CategoryDto } from './dto';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('/all')
  getAllcategory() {
    return this.categoryService.getAllcategory();
  }



  @UseGuards(JwtGuard)
  @Post("/new")
  insertNewCategory(@Body() dto: CategoryDto) {
    return this.categoryService.insertNewCategory(dto)
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('/update/:id')
  editCategory(@Body() dto: CategoryDto, @Param("id") id: string) {
    return this.categoryService.editCategory(id, dto)
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete('/delete/:id')
  deleteCategory(@Param("id") id: string) {
    return this.categoryService.deleteCategory(id)
  }
}
