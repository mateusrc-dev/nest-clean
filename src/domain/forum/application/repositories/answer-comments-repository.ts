import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export abstract class AnswerCommentsRepository {
  // this is repository is only a contract
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract create(answerComment: AnswerComment): Promise<void>
  abstract delete(answerComment: AnswerComment): Promise<void>
}
