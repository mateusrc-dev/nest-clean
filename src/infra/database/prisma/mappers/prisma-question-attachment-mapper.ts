// mappers - transforms an entity in the format of one layer to the format of another layer
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  // static - don't will be need create instance of class for use the method
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type.')
    }

    // raw is a questionAttachment that come of prisma
    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    ) // let's create a reference to questionattachment already exist in database
  }

  static toPrismaUpdateMany(
    attachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    return {
      where: {
        id: {
          in: attachmentsIds,
        },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    }
  }
}

// undefined vs null
// undefined = value not exist, never was defined
// null = unfilled, empty value
