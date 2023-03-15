import { Module } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserUseCase } from './usecase/UserUseCase';
import { HealthController } from './controller/HealthController';
import { PostgresqlRepo } from './repo/PostgresqlRepo';
import { ArticleController } from './controller/ArticleController';
import { ArticleUseCase } from './usecase/ArticleUseCase';
import { ElasticSearchRepo } from './repo/ElasticSearchRepo';
import HackerNewsService from './service/HackerNewsService';

@Module({
  imports: [],
  controllers: [ArticleController, HealthController],
  providers: [ArticleUseCase, HackerNewsService, ElasticSearchRepo],
})
export class AppModule {}
