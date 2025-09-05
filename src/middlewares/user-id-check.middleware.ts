import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    console.log('UserIdCheckMiddleware ', 'antes');

    if (isNaN(Number(userId)) || Number(userId) <= 0) {
      throw new BadRequestException('Invalid ID - Middleware');
    }

    console.log('UserIdCheckMiddleware ', 'depois');
    next();
  }
}
