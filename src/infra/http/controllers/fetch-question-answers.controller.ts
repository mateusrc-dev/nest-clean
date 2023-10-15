import {
  Controller,
  Get,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamSchema = z // remember that this is a schema (representation of data)
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema> // creating a type

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema) // pipe that we create to do validation of schema

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get() // decorator is like a function, the elements after it are arguments
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }

    const answers = result.value.answers

    return {
      answers: answers.map((answer) => AnswerPresenter.toHTTP(answer)),
    }
  }
}
