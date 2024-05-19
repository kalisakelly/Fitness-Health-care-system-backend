// import { Module } from '@nestjs/common';
// import { RedisModule as Redis } from '@nestjs-modules/ioredis';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     Redis.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         config: {
//           host: configService.get<string>('REDIS_HOST'),
//           port: configService.get<number>('REDIS_PORT'),
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   exports: [Redis],
// })
// export class RedisModule {}