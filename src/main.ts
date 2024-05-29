import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('RIL Invoice Module')
    .setDescription('API for RIL Invoice Module built with NestJS')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Enter a JWT token to authorize the requests...',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWTBearerAuth',
    )
    .addGlobalParameters({
      name: 'Authorization',
      in: 'header',
      required: false,
      description: 'bearer token',
      allowEmptyValue: true,
      example: 'Bearer <token>',
      schema: { type: 'string' },
    })
    .addSecurityRequirements('JWTBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const APP_PORT = configService.get<string>('PORT') || 3000;

  await app.listen(APP_PORT);

  const logger = new Logger('Main Module');

  logger.verbose('----------------------------------------------------');
  logger.verbose(`Application is running on: ${await app.getUrl()}`);
  logger.verbose('Swagger 🛠️ http://localhost:' + APP_PORT + '/swagger  🛠️');
  logger.verbose('----------------------------------------------------');
}
bootstrap();
