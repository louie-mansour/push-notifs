import { ArticleController } from './controller/ArticleController';
import { ElasticSearchRepo } from './repo/ElasticSearchRepo';
import { PostgresqlRepo } from './repo/PostgresqlRepo';
import { Auth0Service } from './service/auth/Auth0Service';
import HackerNewsService from './service/hackernews/HackerNewsService';
import { ArticleUseCase } from './usecase/ArticleUseCase';
import { UserUseCase } from './usecase/UserUseCase';
import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';
import { HealthController } from './controller/HealthController';
import { AppInfoController } from "./controller/AppInfoController";
import { AppInfoUseCase } from "./usecase/AppInfoUseCase";

export class AppFactory {
    public static create(): {
        articleController: ArticleController;
        authController: AuthController;
        userController: UserController;
        healthController: HealthController;
        appInfoController: AppInfoController;
    } {
        // repo layer
        const elasticSearchRepo = new ElasticSearchRepo();
        const postgresqlRepo = new PostgresqlRepo();

        // service layer
        const auth0Service = new Auth0Service();
        const hackerNewsService = new HackerNewsService();

        // usecase layer
        const articleUseCase = new ArticleUseCase(
            hackerNewsService,
            elasticSearchRepo,
        );
        const userUseCase = new UserUseCase(auth0Service, postgresqlRepo);
        const appInfoUseCase = new AppInfoUseCase();

        // controllers
        return {
            articleController: new ArticleController(articleUseCase),
            authController: new AuthController(userUseCase),
            userController: new UserController(userUseCase),
            healthController: new HealthController(),
            appInfoController: new AppInfoController(appInfoUseCase),
        };
    }
}
