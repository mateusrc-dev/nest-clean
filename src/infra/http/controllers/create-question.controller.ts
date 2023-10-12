import { Body, Controller, Post, BadRequestException } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
  // here we let's create the schema for create the validation
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema> // we can our schema for create the type of body

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post() // decorator is like a function, the elements after it are arguments
  async handle(
    @Body(bodyValidationPipe)
    body: CreateQuestionBodySchema, // doing the validate of request body
    @CurrentUser() user: TokenPayload, // get the user logged
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
