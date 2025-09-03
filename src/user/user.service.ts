import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    return await this.prisma.users.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
  async readAll() {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async readOne(id: number) {
    return await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }
}
