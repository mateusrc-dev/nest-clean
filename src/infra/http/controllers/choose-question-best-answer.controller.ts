import {
  Controller,
  BadRequestException,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase,
  ) {}

  @Patch() // decorator is like a function, the elements after it are arguments
  @HttpCode(204) // not returns response
  async handle(
    @CurrentUser() user: TokenPayload, // get the user logged
    @Param('answerId') answerId: string,
  ) {
    const { sub: userId } = user

    const result = await this.chooseQuestionBestAnswer.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }
  }
}
