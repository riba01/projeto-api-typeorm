import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() body) {
    return { body };
  }

  @Get()
  async readUsers() {
    return { users: [] };
  }

  @Get(':id')
  async readOneUser(@Param() params: string) {
    return { users: {}, params };
  }

  @Patch(':id')
  async updateUser(@Body() body, @Param() params: string) {
    return {
      method: 'patch',
      body,
      params,
    };
  }

  @Put(':id')
  async replaceUser(@Body() body, @Param() params: string) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Delete(':id')
  async deleteUser(@Param() params: string) {
    return {
      method: 'delete',
      params,
    };
  }
}
