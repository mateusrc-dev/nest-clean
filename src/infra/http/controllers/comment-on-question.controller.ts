import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'

const commentOnQuestionBodySchema = z.object({
  // here we let's create the schema for create the validation
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema)

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema> // we can our schema for create the type of body

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post() // decorator is like a function, the elements after it are arguments
  async handle(
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema, // doing the validate of request body
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
