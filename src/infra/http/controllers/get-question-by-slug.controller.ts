import { Controller, Get, BadRequestException, Param } from '@nestjs/common'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { QuestionPresenter } from '../presenters/question-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get() // decorator is like a function, the elements after it are arguments
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException() // generic error
    }

    const question = result.value.question

    return { question: QuestionPresenter.toHTTP(question) }
  }
}
