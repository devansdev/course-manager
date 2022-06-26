import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './NotFoundExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger UI configuration
  const config = new DocumentBuilder()
    .setTitle('Student Manager')
    .setDescription(
      'API to create students attached to a lecturer and manage the students',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  // Confgigure the validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // set not found path
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(3000);
}
bootstrap();
