import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS, //'jes198',
      database: process.env.DB_NAME, //'api',
      entities: [UserEntity],
      synchronize: process.env.ENV === 'development' ? true : false, //process.env.ENV === 'development' ? true : false,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'emmitt.ryan48@ethereal.email',
          pass: 'Ga6y6cg7DEAMTzKYXP',
        },
      },
      defaults: {
        from: '"NestJs Teste de email" <emmitt.ryan48@ethereal.email',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    FileModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 30000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
