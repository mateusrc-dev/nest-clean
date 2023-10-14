import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentsRepository {
  // this is repository is only a contract
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
