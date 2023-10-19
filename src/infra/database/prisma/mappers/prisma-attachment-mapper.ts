// mappers - transforms an entity in the format of one layer to the format of another layer
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  // static - don't will be need create instance of class for use the method
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}

// undefined vs null
// undefined = value not exist, never was defined
// null = unfilled, empty value
