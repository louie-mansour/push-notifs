import {Injectable} from '@nestjs/common';
import {Article, ArticleBulkResult, ArticleSource} from '../domain/Article';
import {Client} from '@elastic/elasticsearch';

@Injectable()
export class ElasticSearchRepo {
  private readonly client: Client;
  constructor() {
    this.client = new Client({ node: 'http://elastic:9200' });
  }
  public async searchArticles(term: string): Promise<Article[]> {
    const result = await this.client.search({
      index: 'articles',
      query: {
        match: {
          title: term,
        },
      },
      collapse: {
        field: 'url',
      },
    });
    return result.hits.hits.map((hit) => {
      const elasticArticleDto = hit._source as ElasticArticleDto;
      return new Article({
        url: elasticArticleDto.url,
        source: elasticArticleDto.source,
        title: elasticArticleDto.title,
      });
    });
  }
  public async loadArticles(articles: Article[]): Promise<ArticleBulkResult> {
    const operations = articles
      .map((article): ElasticArticleDto => {
        return {
          ...article,
          createdDateTime: new Date(),
        };
      })
      .flatMap((doc) => [{ index: { _index: 'articles' } }, doc]);

    const bulkResponse = await this.client.bulk({ refresh: true, operations });

    const erroredDocuments = [];
    if (bulkResponse.errors) {
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: operations[i * 2],
            document: operations[i * 2 + 1],
          });
        }
      });
      console.log(erroredDocuments);
    }
    return {
      successfullyIndexed: articles.length - erroredDocuments.length,
      failedToIndex: erroredDocuments.length,
    };
  }
}

interface ElasticArticleDto {
  url: string;
  source: ArticleSource;
  title: string;
  createdDateTime: Date;
}
