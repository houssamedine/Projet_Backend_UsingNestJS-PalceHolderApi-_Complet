import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('APP.PORT') || 5000;
  const HOST = configService.get('APP.HOST');
  const SECRET_KEY = configService.get('APP.SECRET_KEY');

  //Corss Origin
  app.enableCors({
    origin: '*',
    // origin: ['http://localhost:4200','http://localhost:3500'],
  });

  //Global Prefixe
  app.setGlobalPrefix('api/v0');

  //GlobalPipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //Config Swagger
  const config = new DocumentBuilder()
    .setTitle('Api Todos')
    .setDescription('Projet Backend using Api-REST-FULL Todos')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      SECRET_KEY,
    )
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Config
  app.listen(PORT, HOST, async () => {
    const url = await app.getUrl();
    console.log(`App starting at : ${url}`);
  });
})();
