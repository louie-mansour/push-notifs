import { User } from '../domain/User';
import { Pool } from 'pg';
import { DatabaseError } from '../error/DatabaseError';
import { migrate } from 'postgres-migrations';
import {Injectable} from "@nestjs/common";
import {Article} from "../domain/Article";
import axios from 'axios';

@Injectable()
export class ElasticSearchRepo {

    public async loadArticles(articles: Article[]): Promise<string> {
        const postBody = this.bulkLoadArticlesBody(articles)
        // axios.post()
        return "dfdf"
    }

    private bulkLoadArticlesBody(articles: Article[]): string {
        let postBody: string = ''
        for (let article of articles) {
            postBody += `{"insert":{"uid":"${article.url}"}}
            {"doc":{"data":{"article":{"url":"${article.url}","title":"${article.title}","source":"${article.source}"}}}, "doc_as_upsert":true}
            `
        }
        return postBody
    }
}
