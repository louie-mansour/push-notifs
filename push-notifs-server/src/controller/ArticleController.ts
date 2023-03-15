import {Controller, Post} from '@nestjs/common';
import {ArticleUseCase} from "../usecase/ArticleUseCase";

@Controller()
export class ArticleController {
  constructor(private readonly articleUseCase: ArticleUseCase) {}
  @Post('/articles/load')
  async loadArticles(): Promise<String> {
    return await this.articleUseCase.loadArticles();
  }

  // @Get('/articles/search')
  // async searchArticles(@Query('q') query): Promise<User> {
  //   const newUser = new User({
  //     ...user,
  //     id: userId,
  //   });
  //   return await this.userUseCase.updateUser(newUser);
  // }
}
