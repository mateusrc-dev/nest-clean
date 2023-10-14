import {
  Body,
  Controller,
  BadRequestException,
  Put,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  // here we let's create the schema for create the validation
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema> // we can our schema for create the type of body

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put() // decorator is like a function, the elements after it are arguments
  @HttpCode(204) // not returns response
  async handle(
    @Body(bodyValidationPipe)
    body: EditQuestionBodySchema, // doing the validate of request body
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('id') questionId: string,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
