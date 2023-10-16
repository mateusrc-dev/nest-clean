import {
  Controller,
  Get,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CommentPresenter } from '../presenters/comment-presenter'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'

const pageQueryParamSchema = z // remember that this is a schema (representation of data)
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema> // creating a type

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema) // pipe that we create to do validation of schema

@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) {}

  @Get() // decorator is like a function, the elements after it are arguments
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }

    const answerComments = result.value.answerComments

    return {
      answers: answerComments.map((comment) =>
        CommentPresenter.toHTTP(comment),
      ),
    }
  }
}
