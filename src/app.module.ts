import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserdetailsController } from './userdetails/userdetails.controller';
import { UserdetailsModule } from './userdetails/userdetails.module';
import { BlogModule } from './blog/blog.module';
import { VideosModule } from './videos/videos.module';
import { MulterModule } from '@nestjs/platform-express';
import { NutritionModule } from './nutrition/nutrition.module';
import { PostrepliesModule } from './postreplies/postreplies.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


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
    MulterModule.register({dest:'./uploads'}),
    UsersModule,
    AuthModule,
    UserdetailsModule,
    BlogModule,
    VideosModule,
    NutritionModule,
    PostrepliesModule,
    CloudinaryModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
