import { User } from '../domain/User';
import { PostgresqlRepo } from '../repo/PostgresqlRepo';

export class UserUseCase {
  constructor(private readonly postgresqlRepo: PostgresqlRepo) {}

  public async createUser(user: User): Promise<User> {
    return await this.postgresqlRepo.insertUser(user);
  }

  public async updateUser(userInput: User): Promise<User> {
    const existingUser = await this.postgresqlRepo.readUser(userInput.id);
    const updatedUser = new User({
      id: userInput.id,
      name: userInput.name || existingUser.name,
      email: existingUser.email,
      phone: userInput.phone || existingUser.phone,
      keywords: userInput.keywords || existingUser.keywords,
    });
    return await this.postgresqlRepo.updateUser(updatedUser);
  }

  public async getUser(userId: string): Promise<User> {
    return await this.postgresqlRepo.readUser(userId);
  }
}
