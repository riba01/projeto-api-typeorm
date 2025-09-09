import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({
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

    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }

  async readAll() {
    return await this.usersRepository.find({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async readOne(id: number) {
    const user = await this.usersRepository.findOne({
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
    await this.usersRepository.update({ id }, data);
    const user = await this.readOne(id);
    return user;
  }

  async upadatePartialUser(id: number, data: UpdatePatchUserDto) {
    await this.findByEmail(data.email, id);
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }
    await this.usersRepository.update({ id }, data);
    const user = await this.readOne(id);
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({
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
    await this.usersRepository.delete({ id });
    return { name: user?.name, email: user?.email };
  }

  async findByEmail(email: string, id?: number) {
    const emailUser = email;
    if (!emailUser) {
      throw new NotFoundException('Email is required');
    }
    const user = await this.usersRepository.findOne({
      where: {
        email: emailUser,
      },
    });
    if (user && user.id !== id) {
      throw new NotFoundException('This Email is exists, try another one');
    }
  }
}
