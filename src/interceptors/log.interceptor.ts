import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        console.log(`URL: ${request.url}`);
        console.log(`Method: ${request.method}`);
        console.log(`Status: ${response.statusCode}`);
        console.log(`Execution time: ${Date.now() - dt}ms`);
      }),
    );
  }
}
