import {User} from '../domain/User';
import {Injectable} from "@nestjs/common";
import HackerNewsService from "../service/HackerNewsService";
import {ElasticSearchRepo} from "../repo/ElasticSearchRepo";

@Injectable()
export class ArticleUseCase {
    constructor(
        private readonly hackerNewsService: HackerNewsService,
        private readonly elasticSearchRepo: ElasticSearchRepo) {}

    public async loadArticles(): Promise<string> {
        const topHackerNewsArticles = await this.hackerNewsService.getTopNArticles(100)
        return await this.elasticSearchRepo.loadArticles(topHackerNewsArticles)
    }
}
