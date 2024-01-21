import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        validationSchema:joi.object({
          POSTGRES_HOST:joi.string().required(),
          POSTGRES_PORT:joi.number().required(),
          POSTGRES_USER:joi.string().required(),
          POSTGRES_PASSWORD:joi.string().required(),
          POSTGRES_DB:joi.string().required(),  

        })
        
      }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
