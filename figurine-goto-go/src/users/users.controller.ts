import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { disableDto, updateUsersDto } from './dto';
import { AdminGuard, JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get('/all')
  getAllProducts() {
    return this.usersService.getAllUsers()
  }

  @UseGuards(AdminGuard)
  @Patch("/updateAdmin/:id")
  updateAdmin(@Param("id") id : string, @Body() dto: disableDto) {
    return this.usersService.updateAdmin(id, dto)
  }

  @Patch("/updateUser/:id")
  updateProduct(@Param("id") id: string, @Body() dto: updateUsersDto) {
    return this.usersService.updateUser(id, dto)
  }

  @Delete("/delete/:id")
  deleteProduct(@Param("id") id: string) {
    return this.usersService.deleteUser
  }
}
