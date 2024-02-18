import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UserdetailsModule } from './userdetails/userdetails.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(configservice:ConfigService) =>({
        type:'postgres',
        host:configservice.get<string>('POSTGRES_HOST'),
        port:configservice.get<number>('POSTGRES_PORT'),
        username:configservice.get<string>('POSTGRES_USER'),
        password:configservice.get<string>('POSTGRES_PASSWORD'),
        database:configservice.get<string>('POSTGRES_DB'),
        autoLoadEntities:true,
        synchronize:true,
      }),


    }),
    UsersModule,
    UserdetailsModule,
    AuthModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
