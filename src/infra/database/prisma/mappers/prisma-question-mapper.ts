// mappers - transforms an entity in the format of one layer to the format of another layer
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  // static - don't will be need create instance of class for use the method
  static toDomain(raw: PrismaQuestion): Question {
    // raw is a question that come of prisma
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        bestAnswerId: undefined,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    ) // let's create a reference to question already exist in database
  }
}

// undefined vs null
// undefined = value not exist, never was defined
// null = unfilled, empty value
