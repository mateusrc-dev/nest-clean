import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  // 'Partial' makes all properties in 'AnswerProps' optional
  const answerComment = AnswerComment.create(
    {
      // slug: Slug.create('example-answer'), // automated creation
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override, // to overwrite any value that was sent in 'override'
    },
    id,
  )

  return answerComment
}
