import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  //Para fechar a conexao
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExist', async () => {
      await app.close();
    });
  }
}
