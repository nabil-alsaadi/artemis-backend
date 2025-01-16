import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Specify allowed HTTP methods
    credentials: true, // Include cookies and other credentials
  });
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000); // Default to 3000 if not set
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
