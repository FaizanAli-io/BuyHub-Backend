import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('E-Commerce Backend API')
    .setDescription('API documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const frontEndPort = 3001;

  app.enableCors({
    origin: `http://localhost:${frontEndPort}`,
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
