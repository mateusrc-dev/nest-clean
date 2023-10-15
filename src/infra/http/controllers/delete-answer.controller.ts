import {
  Controller,
  BadRequestException,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete() // decorator is like a function, the elements after it are arguments
  @HttpCode(204) // not returns response
  async handle(
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('id') answerId: string,
  ) {
    const { sub: userId } = user

    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
