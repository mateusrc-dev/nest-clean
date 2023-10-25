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
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'

const answerQuestionBodySchema = z.object({
  // here we let's create the schema for create the validation
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema> // we can our schema for create the type of body

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post() // decorator is like a function, the elements after it are arguments
  async handle(
    @Body(bodyValidationPipe)
    body: AnswerQuestionBodySchema, // doing the validate of request body
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('questionId') questionId: string,
  ) {
    const { content, attachments } = body
    const { sub: userId } = user

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
