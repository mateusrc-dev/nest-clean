import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export abstract class QuestionsRepository {
  // this is repository is only a contract
  // nestjs don't understand typescript, then let's use abstract class
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract save(question: Question): Promise<void>
  abstract create(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
}
