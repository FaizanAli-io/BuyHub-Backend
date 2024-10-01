import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('E-Commerce Backend API')
    .setDescription('API documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  const frontEndPort = 3001;

  app.enableCors({
    origin: `http://localhost:${frontEndPort}`, // Frontend origin (or whatever port your React app runs on)
    methods: 'GET,POST,PATCH,DELETE', // Allowed methods
    credentials: true, // Enable credentials if needed (for cookies/auth)
  });

  await app.listen(3000);
}
bootstrap();
