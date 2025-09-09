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
  UseGuards,
} from '@nestjs/common';
import { ParamId } from '../decorator/param-id.decorator';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard, RoleGuard)
//@UseInterceptors(LogInterceptor) //assim intercepta todo o controler
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseInterceptors(LogInterceptor) // assim apenas essa rota
  @Roles(Role.ADMIN)
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  async readUsers() {
    return this.userService.readAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async readOneUser(@ParamId() id: number) {
    console.log({ id });
    return this.userService.readOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateUser(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.upadatePartialUser(id, data);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async replaceUser(
    @Body() { name, email, password, birthAt }: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.upadateUser(id, { name, email, password, birthAt });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
