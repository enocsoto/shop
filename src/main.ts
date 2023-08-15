import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap'); //nombre de la funcion opcional
  
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
  .setTitle('Backend Tienda API RestFull')
  .setDescription('Tienda Backend y endpoints')
  .setVersion('1.0')
  .addTag('ca')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
