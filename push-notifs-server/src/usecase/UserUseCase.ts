import { User } from '../domain/User';
import { PostgresqlRepo } from '../repo/PostgresqlRepo';
import { Auth0Service } from '../service/auth/Auth0Service';

export class UserUseCase {
    constructor(
        private readonly auth0Service: Auth0Service,
        private readonly postgresqlRepo: PostgresqlRepo,
    ) {}

    public async login(authorizationCode: string): Promise<{ accessToken: string, user: User }> {
        const { accessToken, user } = await this.auth0Service.exchange(
            authorizationCode,
        );
        await this.postgresqlRepo.loginUser(user);
        return { accessToken, user };
    }

    public async getUser(userId: string): Promise<User> {
        return await this.postgresqlRepo.readUser(userId);
    }
}
