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
    @Body() body: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'patch',
      body,
      id,
    };
  }

  @Put(':id')
  async replaceUser(
    @Body() { name, email, password }: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'put',
      body: {
        name,
        email,
        password,
      },
      id,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return {
      /* method: 'delete', */
      id,
    };
  }
}
