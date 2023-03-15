import {Injectable} from "@nestjs/common";
import axios from 'axios';
import {Article, ArticleSource} from "../domain/Article";

@Injectable()
export default class HackerNewsService {
    public async getTopNArticles(n: number): Promise<Article[]> {
        let articleIds: string[]
        try {
            articleIds = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        } catch (e) {
            console.log(e)
        }
        if (n > articleIds.length) {
            console.log(`HackerNewsService is configured for ${n} articles, but only returns ${articleIds.length} articles`)
        }

        let articles: Article[] = []
        for (let articleId of articleIds.splice(0, n)) {
            try {
                const hackerNewsArticle: HackerNewsArticleDto = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
                articles.push(
                    new Article({
                        title: hackerNewsArticle.title,
                        url: hackerNewsArticle.url,
                        source: ArticleSource.HackerNews
                    })
                )
            } catch (e) {
                console.log(e)
            }
        }
        return articles
    }
}

interface HackerNewsArticleDto {
    title: string;
    url: string;
}