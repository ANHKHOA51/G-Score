import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://g-score-ottk.vercel.app',
      configService.get<string>('FRONTEND_URL'),
      /\.vercel\.app$/
    ].filter(Boolean) as (string | RegExp)[],
    credentials: true,
  });
  
  await app.listen(configService.get<number>('PORT') ?? 3000, '0.0.0.0');
}
bootstrap();
