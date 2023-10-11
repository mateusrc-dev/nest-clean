import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'

@Module({
  providers: [
    PrismaService,
    {
      // when nestjs finds a file that has a dependency on 'QuestionRepository' the class 'PrismaQuestionsRepository' will be used
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      // when nestjs finds a file that has a dependency on 'QuestionRepository' the class 'PrismaQuestionsRepository' will be used
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ], // all module that import the DatabaseModule will can injected this repositories
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ], // export - for be possible the use of this service outside this file when import the DatabaseModule in other file
})
export class DatabaseModule {}
