import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  // 'Partial' makes all properties in 'QuestionProps' optional
  const questionAttachment = QuestionAttachment.create(
    {
      // slug: Slug.create('example-question'), // automated creation
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override, // to overwrite any value that was sent in 'override'
    },
    id,
  )

  return questionAttachment
}
