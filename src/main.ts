import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configservice = app.get(ConfigService);
  const port = configservice.get<number>('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: 'localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
})
  await app.listen(port);
}
bootstrap();
