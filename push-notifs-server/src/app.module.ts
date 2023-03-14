import { Module } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserUseCase } from './usecase/UserUseCase';
import { HealthController } from './controller/HealthController';

@Module({
  imports: [],
  controllers: [UserController, HealthController],
  providers: [UserUseCase],
})
export class AppModule {}
