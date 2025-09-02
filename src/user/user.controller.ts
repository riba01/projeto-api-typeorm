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

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() { name, email, password }: CreateUserDto) {
    return { name, email, password };
  }

  @Get()
  async readUsers() {
    return { users: [] };
  }

  @Get(':id')
  async readOneUser(@Param('id', ParseIntPipe) id: number) {
    return { users: {}, id };
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
