import { ArticleUseCase } from '../usecase/ArticleUseCase';
import { Article, ArticleBulkResult } from '../domain/Article';
import express from 'express';

export class ArticleController {
  constructor(private readonly articleUseCase: ArticleUseCase) {}
  async loadArticles(): Promise<ArticleBulkResult> {
    return await this.articleUseCase.loadArticles();
  }

  async searchArticles(req: express.Request): Promise<Article[]> {
    const query = req.query.q as string;
    return await this.articleUseCase.searchArticles(query);
  }
}
