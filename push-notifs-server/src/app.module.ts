import { Module } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserUseCase } from './usecase/UserUseCase';
import { HealthController } from './controller/HealthController';
import {PostgresqlRepo} from "./repo/PostgresqlRepo";

@Module({
  imports: [],
  controllers: [UserController, HealthController],
  providers: [UserUseCase, PostgresqlRepo],
})
export class AppModule {}
