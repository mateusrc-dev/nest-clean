import {
  Controller,
  Get,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamSchema = z // remember that this is a schema (representation of data)
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema> // creating a type

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema) // pipe that we create to do validation of schema

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get() // decorator is like a function, the elements after it are arguments
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }

    const questionComments = result.value.questionComments

    return {
      answers: questionComments.map((comment) =>
        CommentPresenter.toHTTP(comment),
      ),
    }
  }
}
