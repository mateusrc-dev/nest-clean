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
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerBodySchema = z.object({
  // here we let's create the schema for create the validation
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema> // we can our schema for create the type of body

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put() // decorator is like a function, the elements after it are arguments
  @HttpCode(204) // not returns response
  async handle(
    @Body(bodyValidationPipe)
    body: EditAnswerBodySchema, // doing the validate of request body
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.editAnswer.execute({
      content,
      answerId,
      authorId: userId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
