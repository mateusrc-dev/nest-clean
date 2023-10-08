import { Module } from '@nestjs/common'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService], // prisma is not a global service, so it has to be inserted here
})
export class HttpModule {}