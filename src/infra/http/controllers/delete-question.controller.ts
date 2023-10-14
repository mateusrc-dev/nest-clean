import {
  Controller,
  BadRequestException,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete() // decorator is like a function, the elements after it are arguments
  @HttpCode(204) // not returns response
  async handle(
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('id') questionId: string,
  ) {
    const { sub: userId } = user

    const result = await this.deleteQuestion.execute({
      questionId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
