import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1234',
      username: 'postgres',
      entities: [], // here we have added user enitity in entities array
      database: 'Student fitness& health care DB',
      synchronize: true,
      logging: true,
    }),
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
