import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    return new BadRequestException('Bad Request!');
  }
}
