import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  // 'Partial' makes all properties in 'QuestionProps' optional
  const questionComment = QuestionComment.create(
    {
      // slug: Slug.create('example-question'), // automated creation
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override, // to overwrite any value that was sent in 'override'
    },
    id,
  )

  return questionComment
}
