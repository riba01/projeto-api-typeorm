import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  async readUsers() {
    return this.userService.readAll();
  }

  @Get(':id')
  async readOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
  }

  @Patch(':id')
  async updateUser(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.upadatePartialUser(id, data);
  }

  @Put(':id')
  async replaceUser(
    @Body() { name, email, password, birthAt }: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.upadateUser(id, { name, email, password, birthAt });
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
