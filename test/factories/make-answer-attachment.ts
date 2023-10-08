import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  // 'Partial' makes all properties in 'AnswerProps' optional
  const answerAttachment = AnswerAttachment.create(
    {
      // slug: Slug.create('example-answer'), // automated creation
      attachmentId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      ...override, // to overwrite any value that was sent in 'override'
    },
    id,
  )

  return answerAttachment
}
