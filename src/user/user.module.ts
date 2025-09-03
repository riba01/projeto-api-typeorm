import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
