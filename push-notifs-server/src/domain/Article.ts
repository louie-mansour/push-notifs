import { InvalidInputError } from '../error/InvalidInputError';

export class Article {
    readonly url: string;
    readonly source: ArticleSource;
    readonly title: string;
    constructor(article: { url: string; source: string; title: string }) {
        this.url = this.validateUrl(article.url);
        this.source = this.validateSource(article.source);
        this.title = this.validateTitle(article.title);
    }

    private validateUrl(url: string): string {
        if (!Article.urlRegex.test(url)) {
            throw new InvalidInputError(
                `url '${url}' does not follow regex pattern '${Article.urlRegexPattern}'`,
            );
        }
        return url;
    }

    private validateSource(source: string): ArticleSource {
        if (source.toLowerCase() === ArticleSource.HackerNews.toLowerCase()) {
            return ArticleSource.HackerNews;
        }
        throw new InvalidInputError(
            `source '${source}' does not match any known Article Source`,
        );
    }

    private validateTitle(title: string): string {
        if (title.length > 255) {
            throw new InvalidInputError(
                `title '${title}' is not less than 255 characters`,
            );
        }
        if (title.length === 0) {
            throw new InvalidInputError(`title '${title}' cannot be empty`);
        }
        return title;
    }

    private static urlRegexPattern =
        'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
    private static urlRegex = new RegExp(Article.urlRegexPattern);
}

export enum ArticleSource {
    HackerNews = 'HackerNews',
}

export interface ArticleBulkResult {
    successfullyIndexed: number;
    failedToIndex: number;
}
