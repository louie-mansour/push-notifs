import axios from 'axios';
import { Article, ArticleSource } from '../../domain/Article';

export default class HackerNewsService {
    public async getTopNArticles(n: number): Promise<Article[]> {
        let articleIds: string[];
        try {
            articleIds = (
                await axios.get(
                    'https://hacker-news.firebaseio.com/v0/topstories.json',
                )
            ).data;
        } catch (e) {
            console.log(e);
        }
        if (n > articleIds.length) {
            console.log(
                `HackerNewsService is configured for ${n} articles, but only returns ${articleIds.length} articles`,
            );
        }

        const articles: Article[] = [];
        for (const articleId of articleIds.splice(0, n)) {
            try {
                const hackerNewsArticle: HackerNewsArticleDto = (
                    await axios.get(
                        `https://hacker-news.firebaseio.com/v0/item/${articleId}.json`,
                    )
                ).data;
                if (!hackerNewsArticle.url || !hackerNewsArticle.title) {
                    console.log(
                        'skipping article without title or without url',
                    );
                } else {
                    articles.push(
                        new Article({
                            title: hackerNewsArticle.title,
                            url: hackerNewsArticle.url,
                            source: ArticleSource.HackerNews,
                        }),
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }
        return articles;
    }
}

interface HackerNewsArticleDto {
    title: string;
    url: string;
}
