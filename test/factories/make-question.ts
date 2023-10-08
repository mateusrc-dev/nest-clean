import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  // 'Partial' makes all properties in 'QuestionProps' optional
  const question = Question.create(
    {
      title: faker.lorem.sentence(), // 'sentence' created a text small
      // slug: Slug.create('example-question'), // automated creation
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override, // to overwrite any value that was sent in 'override'
    },
    id,
  )

  return question
}
