import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rateLimiterConfig } from './commun/rate-limiter/rate-limiter';
import { DatabaseService } from './commun/config/database/database.service';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
  imports: [
    //Configuration Variables .ENV
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrivateModule,
    PublicModule,

    //Rate-Limeter
    RateLimiterModule.register(rateLimiterConfig),

    //Configuration Base-Donnée
    //Base Donnée
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //Helmet
    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes('');

    //Morgan
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('');
  }
}
