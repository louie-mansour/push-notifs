import { Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleUseCase } from '../usecase/ArticleUseCase';
import { Article, ArticleBulkResult } from '../domain/Article';

@Controller()
export class ArticleController {
  constructor(private readonly articleUseCase: ArticleUseCase) {}
  @Post('/articles/load')
  async loadArticles(): Promise<ArticleBulkResult> {
    return await this.articleUseCase.loadArticles();
  }

  @Get('/articles/search')
  async searchArticles(@Query('q') query): Promise<Article[]> {
    return await this.articleUseCase.searchArticles(query);
  }
}
