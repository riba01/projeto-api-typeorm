import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Roles } from '../decorator/roles.decorator';
import { User } from '../decorator/user.decorator';
import { Role } from '../enums/role.enum';
import { FileService } from '../file/file.service';
import { photoUploadConfig } from '../file/upload.config';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { MimeTypeValidationPipe } from '../pipes/mime-type-validation.pipe';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post('register')
  async register(@Body() data: AuthRegisterDto) {
    return this.authService.register(data);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDto) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('me')
  async me(@User() user) {
    //console.log(headers);
    return { user };
  }

  @UseInterceptors(FileInterceptor('file', photoUploadConfig))
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('photo')
  async uploadPhoto(
    @User() user,
    @UploadedFile(MimeTypeValidationPipe)
    photo: Express.Multer.File,
  ) {
    //console.log(headers);
    return this.fileService.uploadPhoto(photo, user.id);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 5,
      },
    ]),
  )
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('files-fields')
  async uploadFiles(
    @User() user,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; documents?: Express.Multer.File[] },
  ) {
    const photo = files.photo?.[0] || null; // único arquivo
    const documents = files.documents || []; // lista de arquivos

    // Se tiver foto, salva
    let savedPhoto;
    if (photo) {
      savedPhoto = await this.fileService.uploadPhoto(photo, user.id);
    }

    // Salva cada documento em sequência
    const savedDocuments: Array<{
      success: boolean;
      message: string;
      filename: string;
      path: string;
      url: string;
      userId: number;
    }> = [];
    for (const doc of documents) {
      const saved = await this.fileService.uploadDocument(doc, user.id);
      savedDocuments.push(saved);
    }

    return {
      user,
      photo: savedPhoto,
      documents: savedDocuments,
    };
  }
}
