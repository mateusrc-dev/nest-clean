import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentsRepository {
  // this is repository is only a contract
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
