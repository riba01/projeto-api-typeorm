import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly maillerService: MailerService,
  ) {}

  createToken(user: users) {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
      },
      {
        expiresIn: process.env.JWT_EXPIRATION_SECONDS,
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience,
        //notBefore: '20s', //retarda o ínicio da validade do token
      },
    );

    return {
      accessToken,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    /* console.log(process.env); */

    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
      },
      {
        expiresIn: process.env.JWT_EXPIRATION_SECONDS,
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    await this.maillerService.sendMail({
      subject: 'Recuperação de senha',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        token: token,
      },
    });

    return true;
  }

  async reset(password: string, token: string) {
    //TODO: validar o token para troca de senha
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: this.audience,
      });

      const id = data.id;
      //gerarSalt sugerido
      const salt = await bcrypt.genSalt();
      // console.log({ salt });
      //Criptografar a senha do usuário
      password = await bcrypt.hash(password, salt);

      const user = await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          password,
        },
      });

      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
