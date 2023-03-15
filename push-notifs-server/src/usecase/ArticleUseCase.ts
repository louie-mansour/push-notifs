import { User } from '../domain/User';
import { Injectable } from '@nestjs/common';
import HackerNewsService from '../service/HackerNewsService';
import { ElasticSearchRepo } from '../repo/ElasticSearchRepo';
import { ArticleBulkResult } from '../domain/Article';

@Injectable()
export class ArticleUseCase {
  constructor(
    private readonly hackerNewsService: HackerNewsService,
    private readonly elasticSearchRepo: ElasticSearchRepo,
  ) {}

  public async loadArticles(): Promise<ArticleBulkResult> {
    const topHackerNewsArticles = await this.hackerNewsService.getTopNArticles(
      100,
    );
    return await this.elasticSearchRepo.loadArticles(topHackerNewsArticles);
  }

  public async searchArticles(query: string) {
    return await this.elasticSearchRepo.searchArticles(query);
  }
}
