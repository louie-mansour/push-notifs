import { ArticleUseCase } from '../usecase/ArticleUseCase';
import express from 'express';

export class ArticleController {
    constructor(private readonly articleUseCase: ArticleUseCase) {}
    async loadArticles(req: express.Request, res: express.Response) {
        const articleBulkResult = await this.articleUseCase.loadArticles();
        return res.send(articleBulkResult);
    }

    async searchArticles(req: express.Request, res: express.Response) {
        const query = req.query.q as string;
        const articles = await this.articleUseCase.searchArticles(query);
        return res.send({
            articles: articles
        });
    }
}
