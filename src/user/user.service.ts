import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    //gerarSalt sugerido
    const salt = await bcrypt.genSalt();
    //Criptografar a senha do usuário
    data.password = await bcrypt.hash(data.password, salt);

    return await this.prisma.users.create({
      data,
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
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        birthAt: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException({
        message: 'Usuário não encontrado',
        statusCode: 404,
        error: 'Not Found',
      });
    }
    return user;
  }

  async upadateUser(id: number, data: UpdateUserDto) {
    await this.findByEmail(data.email, id);
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }
    return await this.prisma.users.update({
      data,
      where: {
        id,
      },
    });
  }

  async upadatePartialUser(id: number, data: UpdatePatchUserDto) {
    await this.findByEmail(data.email, id);
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }
    return await this.prisma.users.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException({
        message: 'Usuário não encontrado',
        statusCode: 404,
        error: 'Not Found',
      });
    }
    return await this.prisma.users.delete({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findByEmail(email: string, id?: number) {
    const emailUser = email;
    if (!emailUser) {
      throw new NotFoundException('Email is required');
    }
    const user = await this.prisma.users.findUnique({
      where: {
        email: emailUser,
      },
    });
    if (user && user.id !== id) {
      throw new NotFoundException('This Email is exists, try another one');
    }
  }
}
