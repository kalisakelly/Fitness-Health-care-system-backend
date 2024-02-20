import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configservice = app.get(ConfigService);
  const port = configservice.get<number>('PORT');
  app.use(cookieParser());
  app.enableCors({
    origin: 'localhost:3000',
    credentials: true
})
  await app.listen(port);
}
bootstrap();
