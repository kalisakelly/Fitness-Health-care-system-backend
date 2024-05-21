import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly redisClient: Redis;
  private readonly redisStore: RedisStore;

  constructor() {
    this.redisClient = new Redis({ host: 'localhost', port: 6379 }); // Update with your Redis configuration
    this.redisStore = new RedisStore({
      client: this.redisClient,
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    session({
      store: this.redisStore,
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true in production
    })(req, res, next);
  }
}
