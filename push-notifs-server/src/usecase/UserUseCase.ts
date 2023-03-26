import { User } from '../domain/User';
import { PostgresqlRepo } from '../repo/PostgresqlRepo';
import { Auth0Service } from '../service/auth/Auth0Service';

export class UserUseCase {
    constructor(
        private readonly auth0Service: Auth0Service,
        private readonly postgresqlRepo: PostgresqlRepo,
    ) {}

    public async login(authorizationCode: string): Promise<string> {
        const { accessToken, user } = await this.auth0Service.exchange(
            authorizationCode,
        );
        await this.postgresqlRepo.insertUser(user);
        return accessToken;
    }
    // public async createUser(user: User): Promise<User> {
    //   return await this.postgresqlRepo.insertUser(user);
    // }

    public async updateUser(userInput: User): Promise<User> {
        const existingUser = await this.postgresqlRepo.readUser(userInput.id);
        const updatedUser = new User({
            id: userInput.id,
            name: userInput.name || existingUser.name,
            email: existingUser.email,
            emailVerified:
                userInput.emailVerified || existingUser.emailVerified,
            phone: userInput.phone || existingUser.phone,
            phoneVerified:
                userInput.phoneVerified || existingUser.phoneVerified,
            keywords: userInput.keywords || existingUser.keywords,
        });
        return await this.postgresqlRepo.updateUser(updatedUser);
    }

    public async getUser(userId: string): Promise<User> {
        return await this.postgresqlRepo.readUser(userId);
    }
}
